IP=172.17.52.217
readonly DATA=http://$IP:7001/tracking-tool-web
curl --noproxy $IP -c ../resources/cookie.txt   $DATA/index.html
curl --noproxy $IP -X POST -c ../resources/cookie.txt -d "j_username=testbdbus&j_password=testbdbus123" $DATA/j_security_check

for file in ../testData/*.json
do
	curl --noproxy $IP -X POST -b ../resources/cookie.txt  $DATA/services/dossier-cases/ -d @$file --header "Content-Type: application/json"
done
