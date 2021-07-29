FROM pkosiec/mongo-seeding:latest

#
# Copy sample data
#

COPY ./data /import-data

#
# Set environmental variables (optional)
#

ENV DROP_DATABASE true
ENV REPLACE_ID true

#
# Set default workspace to not specify it every time the image is ran
#

WORKDIR /import-data