FROM golang:alpine as builder

WORKDIR /src

COPY . .

RUN GOOS=linux go build -ldflags="-w -s" -o /src/main

FROM scratch

COPY --from=builder /src/main .

CMD [ "./main" ]