# Reading and updating editor state

State can only be updated inside of `editor.update(() => {...})` State can be read either in an update closure or in `editor.getEditorState.read(() => {...})`. The closure passed to the update or read call needs to be synchronous. The closure functions are the only place you have full access to the "lexical" context of the active editor state. The lexical functions beginning with `$` (for example `$getSelection`) can only be used in these closures.

With few exceptions (hmm) you should only call methods and access properties of a Lexical Node whle in a read or update call.

## Vimterlude

Change window height: :resize n
Change window width: :vertical resize n

Change char under cursor: r, then character to replace

Move screen so cursor is:

- at top: zt
- center: zz
- at bottom zb

## My mappings

close curly braces: (insert mode) <C-j>
callback funciton: (insert mode) <C-c>
