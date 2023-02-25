getMessagePayload() {
  echo '{"content": "'$1'"}'
}

sendMessage() {
  local json=$(getMessagePayload "$1")
  local CHANNEL="${2:-dev}"
  curl -o /dev/null -s -X POST --data "$json" http://127.0.0.1:8080/messages/$CHANNEL
}
