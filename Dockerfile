FROM node:18-alpine

RUN \
apk update && \
apk upgrade && \
apk add --no-cache git ca-certificates wget openssh git dumb-init util-linux;

RUN a_pass=$(echo "i_am_super_admin" | mkpasswd) && \
    echo "root:${a_pass}" | chpasswd

WORKDIR /devops-challenge

RUN adduser -D challenger
RUN chown -R node /devops-challenge

RUN a_pass=$(echo "i_am_medium_admin" | mkpasswd) && \
    echo "node:${a_pass}" | chpasswd

RUN chown node /etc
RUN chown node /var/log/
RUN chown node /home

RUN chown challenger /etc
RUN chown challenger /var/log/
RUN chown challenger /home

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN runuser -u node -- npm ci && mv node_modules ../

RUN chmod 1 /devops-challenge



USER node
COPY --chown=node:node . .


CMD ["npm", "run", "start:api:dev"]
RUN chmod 1 /devops-challenge


USER challenger
