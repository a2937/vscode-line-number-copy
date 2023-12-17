import * as vscode from 'vscode'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    'extension.copyWithLineNumbers',
    async () => {
      const editor = vscode.window.activeTextEditor

      if (editor) {
        const selection = editor.selection
        const selectedText = editor.document.getText(selection)

        const lineNumbers = Array.from(
          { length: selection.end.line - selection.start.line + 1 },
          (_, i) => i + selection.start.line + 1,
        )

        const textWithLineNumbers = lineNumbers
          .map((num, index) => `${num}: ${selectedText.split('\n')[index]}`)
          .join('\n')

        await vscode.env.clipboard.writeText(textWithLineNumbers)
      }
    },
  )

  context.subscriptions.push(disposable)
}
