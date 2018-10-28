FROM python:3.7

ENV PORT 8000
EXPOSE 8000

RUN mkdir /app
COPY . /app/
WORKDIR /app
RUN pip install -r requirements.txt
RUN mv run.sh app/
WORKDIR /app/app
CMD ["./run.sh"]
