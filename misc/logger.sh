#! /bin/bash

VALPLAYERS=0
newPlayer=false
declare -A steam=( ["76561197981323839"]="Kvm" ["76561197988338431"]="Jonah" ["76561197972464107"]="Dylla" ["76561197966389725"]="Mordechaos")
arrPlay=("")

getMessagePayload() {
  echo "'"{\"content\": \"$1\"}"'"
}

sendMessage() {
  local json=$(getMessagePayload $1)
  curl -X POST 127.0.0.1:8080/messages/dev -d $json
}

setPinnedMessage() {
  local json=$(getMessagePayload $1)
  curl -X PUT 127.0.0.1:8080/pinned/valheim -d $json
}

setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n($VALPLAYERS) playing."

array_contains2 () {
    local array="$1[@]"
    local seeking=$2
    local in=1
    for element in "${!array}"; do
        if [[ $element == "$seeking" ]]; then
            in=0
            break
        fi
    done
    return $in
}

while IFS= read -r line
do
    case $line in
		*"Got connection SteamID"*)
			newPlayer=true;;
		*"Got character ZDOID from"*)
			if [ newPlayer=true ]; then
				newPlayer=false
				#((VALPLAYERS+=1))
				player=${line#*from}
				player=${player% :*}
				if ! array_contains2 arrPlay $player; then
					arrPlay+=($player)
				fi
				joined=`echo $(echo ${arrPlay[@]}) | tr ' ' ','`
				echo "Player Joined ($VALPLAYERS)"
				VALPLAYERS=$((${#arrPlay[@]}))
        setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n($VALPLAYERS) playing - ($joined)"
			fi;;
		*"Closing socket"*)
			#((VALPLAYERS-=1))
			player=${line#*socket }
            player="${steam[$player]}"
		    arrPlay=("${arrPlay[@]/$player}")
			for i in ${!arrPlay[@]}; do [[ -z ${arrPlay[i]} ]] && unset arrPlay[i]; done
	        echo "Player Left ($VALPLAYERS)"
            joined=`echo $(echo ${arrPlay[@]}) | tr ' ' ','`
			VALPLAYERS=$((${#arrPlay[@]}))
			if [ "$joined" = "" ]; then
        setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n(0) playing - ($joined)"
			else
        setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n($VALPLAYERS) playing - ($joined)"
			fi;;
		*)
    esac
done < /home/kvamme/logs/valheim_log.txt


tail -fn0 /home/kvamme/logs/valheim_log.txt | \
while read line ; do
	case $line in
		*"Got connection SteamID"*)
			newPlayer=true;;
		*"Got character ZDOID from"*)
			if [ newPlayer=true ]; then
				newPlayer=false
				#((VALPLAYERS+=1))
				player=${line#*from}
				player=${player% :*}
				if ! array_contains2 arrPlay $player; then
					arrPlay+=($player)
				fi
				joined=`echo $(echo ${arrPlay[@]}) | tr ' ' ','`
				echo "Player Joined ($VALPLAYERS)"
				VALPLAYERS=$((${#arrPlay[@]}))
        setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n($VALPLAYERS) playing - ($joined)"
			fi;;
		*"Closing socket"*)
			#((VALPLAYERS-=1))
			player=${line#*socket }
            player="${steam[$player]}"
		    arrPlay=("${arrPlay[@]/$player}")
			for i in ${!arrPlay[@]}; do [[ -z ${arrPlay[i]} ]] && unset arrPlay[i]; done
	        echo "Player Left ($VALPLAYERS)"
            joined=`echo $(echo ${arrPlay[@]}) | tr ' ' ','`
			VALPLAYERS=$((${#arrPlay[@]}))
			if [ "$joined" = "" ]; then
        setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n($VALPLAYERS) playing."
			else
        setPinnedMessage "Valheim is currently $(systemctl is-active valheim).\n($VALPLAYERS) playing - ($joined)"
			fi;;
		*)
	esac

done
