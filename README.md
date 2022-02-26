<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/bossoq/siew-generator">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">สร้างคำเสี่ยว</h3>

  <p align="center">
    เวปไซต์สร้างคำเสี่ยวจากคำศัพท์ที่กรอกเข้ามา
    <br />
    <a href="https://github.com/bossoq/siew-generator"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://siew-generator.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/bossoq/siew-generator/issues">Report Bug</a>
    ·
    <a href="https://github.com/bossoq/siew-generator/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation & Run</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://siew-generator.vercel.app)

แรงบันดาลใจจาก [สร้าง มุกเสี่ยว โดยใช้ Python และ Deep Learning (Text Generation)](https://kok-suttanan.medium.com/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-%E0%B8%A1%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7-%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B9%83%E0%B8%8A%E0%B9%89-python-%E0%B9%81%E0%B8%A5%E0%B8%B0-deep-learning-text-generation-809a9c8686ab) โดยคุณ Suttanan Charoenpanich ที่สร้าง Model ในการสร้างประโยคจากคำศัพท์ที่กรอกเข้ามา โดยได้ทำการปรับ [Colab](https://colab.research.google.com/drive/1pGl6lh4iZUf0HdJsaTW8BkbEnyK88OBI?usp=sharing) นี้มารันในเครื่อง Server ที่เตรียมไว้ และเปิด API ให้เวปไซต์เรียกใช้งาน

### Built With

This project use the follow frameworks:

* [Tailwindcss](https://tailwindcss.com/)
* [React](https://reactjs.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [Tensorflow](https://www.tensorflow.org/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Node

  ```sh
  brew install node
  ```

* Python

  ```sh
  brew install python
  ```

* Docker [Get Docker Here](https://docs.docker.com/get-docker/)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/bossoq/siew-generator.git
   ```

2. Create backend using docker-compose (Backend Server default bind to port 5000)

   ```sh
   git checkout python-backend
   echo 'TOKEN=<your-token>' > .env
   docker-compose up -d
   ```

3. To install dependencies & start server run

   ```sh
   git checkout main
   echo 'TOKEN=<your-token>' > .env
   yarn install
   yarn start
   ```

4. Or deploy to vercel (Please don't forget to setup environment variables)

   ```sh
   git checkout main
   vercel deploy
   ```

5. To train model

   ```sh
   git checkout python-model-trainer
   pipenv install
   # train new model
   cd utils
   pipenv run python training.py
   # test new model
   # test by post to backend
   cd ../
   pipenv run python app.py
   ```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/bossoq/siew-generator/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the Market Statistics, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

K. Wajakajornrit - [@bossssoq](https://twitter.com/bossssoq) - kittipos@picturo.us

Project Link: [https://github.com/bossoq/siew-generator](https://github.com/bossoq/siew-generator)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Blog Post by Suttanan Charoenpanich](https://kok-suttanan.medium.com/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-%E0%B8%A1%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7-%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B9%83%E0%B8%8A%E0%B9%89-python-%E0%B9%81%E0%B8%A5%E0%B8%B0-deep-learning-text-generation-809a9c8686ab)
* [React](https://reactjs.org)
* [Tailwindcss](https://tailwindcss.com/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [Tensorflow](https://www.tensorflow.org/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/bossoq/siew-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/bossoq/siew-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bossoq/siew-generator.svg?style=for-the-badge
[forks-url]: https://github.com/bossoq/siew-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/bossoq/siew-generator.svg?style=for-the-badge
[stars-url]: https://github.com/bossoq/siew-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/bossoq/siew-generator.svg?style=for-the-badge
[issues-url]: https://github.com/bossoq/siew-generator/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/kittiposw
[product-screenshot]: images/screenshot.jpg