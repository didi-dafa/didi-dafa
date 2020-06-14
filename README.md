# Didi Dafa

Common painting board for many people

## Running
Multi-arch (`linux/amd64,linux/386,linux/arm64,linux/ppc64le,linux/arm/v7,linux/arm/v6`) build on DockerHub @ [dididafa/didi-dafa](https://hub.docker.com/repository/docker/dididafa/didi-dafa/tags?page=1)

```shell script
docker volume create dafa_data
docker run -d -v dafa_data:/app/მდგრადობა -p 9000:9000 dididafa/didi-dafa
```

You will be able to access project on http://0.0.0.0:9000

## Notes

Project is pretty old, but the cool part is that the source code is written with
Georgian characters and with very hipster alternative names for common acronyms 
(`x,y,z` becomes `ხ,ჯ,ჰ`, `querystring` becomes `კითხვის_სიმი`).

Repository imported from mercurial (`hg`) but for some reason the commit message
encodings got messed up and now is shown as question marks `??????`. 

## Credits
Huge credits to @rimnadze for the initial codebase back in 2013
