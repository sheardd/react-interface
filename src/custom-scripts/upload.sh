#!/bin/sh
HOST='sftp://35.176.194.112'
USER='ftpu'
PASSWORD='itftpuruns'

# DISTANT DIRECTORY
REMOTE_DIR='uploads/react-interface'

#LOCAL DIRECTORY
LOCAL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." >/dev/null && pwd )"
LOCAL_DIR=$LOCAL_DIR'/build'


# RUNTIME!
echo
echo "Starting upload to $REMOTE_DIR at $HOST from $LOCAL_DIR"
date

lftp -e "mirror -Rc $LOCAL_DIR $REMOTE_DIR;exit" -u "$USER","$PASSWORD" $HOST <<EOF
exit
EOF
echo
echo "Transfer finished"
date