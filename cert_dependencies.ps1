$executionPolicy = Get-ExecutionPolicy -Scope CurrentUser
if ($executionPolicy -ne 'RemoteSigned') {
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
}

irm get.scoop.sh | iex

scoop bucket add extras

scoop install mkcert

pause

Read-Host "Press Enter to exit"