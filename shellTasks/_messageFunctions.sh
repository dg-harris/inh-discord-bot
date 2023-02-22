getMessagePayload() {
  echo '{"content": "'$1'"}'
}

sendMessage() {
  local json=$(getMessagePayload "$1")
  curl -X POST --data "$json" http://127.0.0.1:8080/messages/dev
}
