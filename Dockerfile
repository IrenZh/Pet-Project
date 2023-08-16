FROM cypress/included:12.14.0

WORKDIR /e2e

COPY . /e2e/
RUN npm install

ENTRYPOINT ["npm","run","cy:run"]