import * as vscode from 'vscode'
import * as myExtension from '../extension'
import * as sinon from 'sinon'

suite('copyWithLineNumbers command', () => {
  test('should copy selected lines with line numbers to the clipboard', async () => {
    const stubTextEditor = sinon.stub(vscode.window, 'activeTextEditor')
    stubTextEditor.value({
      selection: new vscode.Selection(1, 0, 3, 0),
      document: {
        getText: () => {
          return 'line1\nline2\nline3'
        },
      },
    })

    // Mock vscode.env.clipboard.writeText
    // TODO: Figure out how to replace read-only property `vscode.env.clipboard.writeText` with sinon fake
    const mockWriteText = sinon.fake()
    sinon.replace(vscode.env.clipboard, 'writeText', mockWriteText)

    // Create a mock ExtensionContext
    const mockExtensionContext = {} as vscode.ExtensionContext

    // Call the command
    await myExtension.activate(mockExtensionContext)

    // Check if clipboard.writeText was called with the expected content
    sinon.assert.calledWith(mockWriteText, '2: line2\n3: line3')
  })
})
