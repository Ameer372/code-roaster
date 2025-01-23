import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Code Roaster Extension Activated!");

  // Command for manual roasting
  let roastCommand = vscode.commands.registerCommand("code-roaster.run", () => {
    roastActiveFile();
  });

  // Auto-roast on file save
  let saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
    roastOnSave(document);
  });

  context.subscriptions.push(roastCommand, saveListener);
}

export function deactivate() {}

// Function to manually roast the active file
function roastActiveFile() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const code = document.getText();
    const roast = generateRoast(code);
    vscode.window.showInformationMessage(roast);
  } else {
    vscode.window.showErrorMessage("Open a file to roast your code!");
  }
}

// Function to roast when a file is saved
function roastOnSave(document: vscode.TextDocument) {
  const code = document.getText();
  const roast = generateRoast(code);

  vscode.window.showInformationMessage(roast);
}

// Function to generate a random roast based on the code
function generateRoast(code: string): string {
  const roasts = [
    "Wow, this code is so clean... if clean means a dumpster fire.",
    "I see you've implemented spaghetti code as a design pattern. Bold choice!",
    "This code brought tears to my eyes—tears of sadness.",
    "Is this an AI-generated code or did your cat walk on the keyboard?",
    "This code violates every law of physics, logic, and humanity.",
    "I ran this code through a linter. The linter quit its job.",
    "Looks like you’ve achieved maximum entropy with this file.",
    "This isn’t just code; it’s an emotional rollercoaster.",
    "I didn't know 'undefined' could be a coding style. Impressive!",
    "This is the kind of code that makes Stack Overflow moderators cry.",
  ];

  if (code.trim().length === 0) {
    return "No code? No roast. But that’s the best code you’ve written today.";
  } else if (code.split("\n").length > 200) {
    return "Wow, a wall of code! Ever heard of functions?";
  }

  const randomIndex = Math.floor(Math.random() * roasts.length);
  return roasts[randomIndex];
}
