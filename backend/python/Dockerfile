FROM tensorflow/tensorflow:2.7.1

WORKDIR /app

# pythainlp 3.0.5 ships an invalid PEP 440 specifier ("nltk>=3.3.*") that pip >= 24.1
# rejects (the original pipenv flow bundled a modern pip). Pin pip < 24.1 and install
# the exact pinned deps directly.
RUN pip install --no-cache-dir "pip<24.1" && \
    pip install --no-cache-dir \
      pythainlp==3.0.5 \
      tensorflow-cpu==2.8.0 \
      flask==2.0.3 \
      waitress==2.0.0

COPY . /app

CMD ["python", "-u", "main.py"]
