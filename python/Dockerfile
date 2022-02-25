FROM tensorflow/tensorflow:2.7.1

WORKDIR /app

RUN pip install --upgrade pip

RUN pip install pipenv

COPY Pipfile /app/

RUN pipenv install

COPY /rootfs /app

CMD ["pipenv", "run", "python", "-u", "main.py"]
