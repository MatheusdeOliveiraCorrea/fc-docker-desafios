FROM golang:1.7 AS hello-world-go

WORKDIR /go/src

COPY ./hello-world.go .

RUN go build -ldflags="-s -w" hello-world.go

FROM scratch
     
COPY --from=hello-world-go /go/src/hello-world .

CMD [ "/hello-world" ]