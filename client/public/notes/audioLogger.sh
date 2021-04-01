#!/bin/bash

for AUDIO_FILE in $( ls ./sources ); do

  echo "Processing $AUDIO_FILE file..."

  echo ./sources/$AUDIO_FILE

  ffmpeg -i ./sources/"$AUDIO_FILE" ./wavCache/"$AUDIO_FILE".wav

  echo "Converted to wav file..."

  meyda ./wavCache/"$AUDIO_FILE".wav --o=./jsonOutput/"$AUDIO_FILE".json --format=json chroma

done;


# for AUDIO_FILE in $( ls ./); do
#   ffmpeg -i $AUDIO_FILE cache.wav
#   echo '\n\n' $AUDIO_FILE '\n\n' >> ./audioLogger.json
#   meyda cache.wav --format=json chroma >> ./audioLogger.json
#   rm cache.wav
# done;