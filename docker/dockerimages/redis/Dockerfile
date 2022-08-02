ARG REDIS_VER=6.2.6
ARG ARCH=x64
ARG OSNICK=bullseye

FROM redislabs/rejson:latest as rejson
FROM redisfab/redis:${REDIS_VER}-${ARCH}-${OSNICK}

ENV LD_LIBRARY_PATH /usr/lib/redis/modules
ENV REDISGEARS_MODULE_DIR /var/opt/redislabs/lib/modules
ENV REDISGEARS_PY_DIR /var/opt/redislabs/modules/rg
ENV REDISGRAPH_DEPS libgomp1 git

WORKDIR /data
RUN apt-get update -qq
RUN apt-get upgrade -y
RUN apt-get install -y --no-install-recommends ${REDISGRAPH_DEPS};
RUN rm -rf /var/cache/apt

COPY --from=rejson ${LD_LIBRARY_PATH}/*.so ${LD_LIBRARY_PATH}/


ENTRYPOINT ["redis-server"]
CMD ["--loadmodule", "/usr/lib/redis/modules/rejson.so"]
