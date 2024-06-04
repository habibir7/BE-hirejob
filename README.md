<br />
<p align="center">

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Peworld Hire Job Rest API</h3>
  
  <a href="">
    <img src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717530475/hirejob-peworld-logo/Logo-bg-white_lccbcc.png" alt="Logo" width="200px">
  </a>

  <p align="center">
    <a href="https://github.com/habibir7/BE-hirejob/issues">Report Bug</a>
    ·
    <a href="https://github.com/habibir7/BE-hirejob/issues">Feature Request</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#screenshoots">Screenshots</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#team">Team</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Peworld Hire Job Rest API is server api that used in [`Peworld - Hirejob Web Aplication`](https://hirejob-project.vercel.app) . This server manage all function and endpoint in Peworld - Hirejob Web such as create and update profile for recruiter and worker, add skill, work experience and portofolio for worker, and hire worker for recruiter. Besides that, this web also provides chat features so that recruiter and worker can interact with each other. This website is also facilitated by authentication, so only users who have registered and logged in can access it so that data will be secure.

### Built With

- [Node JS](https://nodejs.org/en/docs/)
- [Express JS](https://expressjs.com/)
- [Nodemailer Package](https://www.npmjs.com/package/nodemailer)
- [Cloudinary](https://cloudinary.com/)
- [Morgan Package](https://www.npmjs.com/package/morgan)
- [DotEnv Package](https://www.npmjs.com/package/dotenv)
- [JWT Package](https://www.npmjs.com/package/jsonwebtoken)
- [UUID Package](https://www.npmjs.com/package/uuid)
- [Multer Package](https://www.npmjs.com/package/multer)
- [Argon2 Package](https://www.npmjs.com/package/argon2)
- [Body-parser Package](https://www.npmjs.com/package/body-parser)
- [Cors Package](https://www.npmjs.com/package/cors)
- [Helmet Package](https://www.npmjs.com/package/helmet)
- [Pg Package](https://www.npmjs.com/package/pg)
- [Xss-clean](https://www.npmjs.com/package/xss-clean)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install.

- [nodejs](https://nodejs.org/en/download/)

### Installation

1. Clone the repo

```sh
https://github.com/habibir7/BE-hirejob.git
```

2. Install NPM packages

```sh
npm install
```

3. Add .env file at folder project, and add following

```sh

DB_HOST= your db host
DB_USER= your db username
DB_NAME= your db name
DB_PASSWORD= your db password
DB_PORT= your db port
JWT_TOKEN= fill in the way you want
PHOTO_NAME= your cloudinary username
PHOTO_KEY= your cloudinary api key
PHOTO_SECRET= your cloudinary api secret
EMAIL_NAME= name of the email you want to use for nodemailer
EMAIL_PASS= password of the email you want to use for nodemailer

```

<!-- SCREENSHOTS -->

## Screenshoots

<p align="center" display=flex>
    <table>
        <tr>
            <td>Login Page</td>
            <td>Register Page</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531092/hirejob-peworld-logo/Login_gsfuyb.png" alt="Login Page" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531092/hirejob-peworld-logo/Regist_x5g2fe.png" alt="Register Page" width=100%/></td>
        </tr>
        <tr>
            <td>Landing Page</td>
            <td>Home Perekrut</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531093/hirejob-peworld-logo/Landing_xj7lpl.png" alt="Landing Page" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531089/hirejob-peworld-logo/Home_Perekrut_ghte5p.png" alt="Home Recruiter" width=100%/></td>
        </tr>
        <tr>
            <td>Edit Profile Pekerja </td>
            <td>Profile Talent</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531088/hirejob-peworld-logo/Edit_Profile_evvo2x.png" alt="Edit Profile Pekerja" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531090/hirejob-peworld-logo/Profile_Talent_choj9j.png" alt="Profile Talent" width=100%/></td>
        </tr>
        <tr>
            <td>Hiring</td>
            <td>Chat</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531089/hirejob-peworld-logo/Hiring_am4xsu.png" alt="Hiring" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531088/hirejob-peworld-logo/Chat_wwn3m8.png" alt="Chat" width=100%/></td>
        </tr>
    </table>  
</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions that make the open source community the best place to learn and create. Every contribution you make is valuable.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your/branch`)
3. Commit your Changes (`git commit -m 'Add some new feature'`)
4. Push to the Branch (`git push origin feature/yourbranch`)
5. Open a Pull Request

<!-- RELATED PROJECT -->

## Related Project

- [`Peworld Hirejob Web Demo`](https://hirejob-project.vercel.app/)
- [`Peworld Hirejob Web Frontend Repository`](https://github.com/rikiprimus/FE-hirejob)

<!-- OUR TEAM -->

## Team

<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/muhabby">
          <img width="100" src="https://avatars.githubusercontent.com/u/94688759?v=4" alt="Muhabby"><br/>
          <sub><b>Muhabby Mulya</b></sub> <br/>
          <h6>Project Manager | Back End Web Developer</h6>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/habibir7">
          <img width="100" src="https://avatars.githubusercontent.com/u/45602586?v=4" alt="Habibi"><br/>
          <sub><b>Muhammad Habibi Ramadhan</b></sub> <br/>
          <h6>Leader of Back End Web Developer</h6>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/rikiprimus">
          <img width="100" src="https://avatars.githubusercontent.com/u/34765525?v=4" alt="Ricky"><br/>
          <sub><b>Ricky Primus Saputra</b></sub> <br/>
          <h6>Leader of Front End Web Developer</h6>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/ekyourkid">
          <img width="100" src="https://avatars.githubusercontent.com/u/57765757?v=4" alt="Rizky"><br/>
          <sub><b>Rizky Syahputra</b></sub> <br/>
          <h6>Front End Web Developer</h6>
        </a>
      </td>
    </tr>
  </table>
</center>

<p align="right">(<a href="#top">back to top</a>)</p>
