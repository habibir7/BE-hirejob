<div id="top"></div>

<br />
<div align="center">
  <h3 align="center">Peworld Hire Job Rest API</h3>
  
  <a href="">
    <img src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717530475/peworld-hirejob-assets/logo/Logo-bg-white_lccbcc.png" alt="Logo" width="200px">
  </a>

  <p align="center">
    <a href="https://github.com/habibir7/BE-hirejob/issues">Report Bug</a>
    ·
    <a href="https://github.com/habibir7/BE-hirejob/issues">Feature Request</a>
  </p>
</div>

## Table of Contents

<div>
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
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#team">Team</a></li>
  </ol>
</div>

## About The Project

Peworld Hire Job Rest API is server api that used in [Peworld - Hirejob Website](https://hirejob-project.vercel.app) . This server manage all function and endpoint in Peworld - Hirejob Web such as create and update profile for recruiter and worker, add skill, work experience and portofolio for worker, and hire worker for recruiter. Besides that, this web also provides chat features so that recruiter and worker can interact with each other. This website is also facilitated by authentication, so only users who have registered and logged in can access it so that data will be secure.

### Built With

- [Express.Js](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [Node.Js](https://nodejs.org/en/download/)

### Installation

- Clone Repository
```sh
git clone https://github.com/habibir7/BE-hirejob.git
```

- Install Module
```sh
npm install
```

- Setup .env
```sh
DB_HOST= "db host"
DB_USER= "db username"
DB_NAME= "db name"
DB_PASSWORD= "db password"
DB_PORT= "db port"
JWT_TOKEN= "fill in random text"
PHOTO_NAME= "cloudinary username"
PHOTO_KEY= "cloudinary api key"
PHOTO_SECRET= "cloudinary api secret"
EMAIL_NAME= "name of the email to use for nodemailer"
EMAIL_PASS= "password of the email to use for nodemailer"
```
- Start Project
```sh
npm run server
```

## Screenshoots

Here is a project that use Peworld Hire Job Rest API.

<p align="center" display=flex>
    <table>
        <tr align="center">
            <td>Login Page</td>
            <td>Register Page</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531092/peworld-hirejob-assets/ss-website/Login_gsfuyb.png" alt="Login Page" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531092/peworld-hirejob-assets/ss-website/Regist_x5g2fe.png" alt="Register Page" width=100%/></td>
        </tr>
        <tr align="center">
            <td>Landing Page</td>
            <td>Home Perekrut</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531093/peworld-hirejob-assets/ss-website/Landing_xj7lpl.png" alt="Landing Page" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531089/peworld-hirejob-assets/ss-website/Home_Perekrut_ghte5p.png" alt="Home Recruiter" width=100%/></td>
        </tr>
        <tr align="center">
            <td>Edit Profile Pekerja </td>
            <td>Profile Talent</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531088/peworld-hirejob-assets/ss-website/Edit_Profile_evvo2x.png" alt="Edit Profile Pekerja" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531090/peworld-hirejob-assets/ss-website/Profile_Talent_choj9j.png" alt="Profile Talent" width=100%/></td>
        </tr>
        <tr align="center">
            <td>Hiring</td>
            <td>Chat</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531089/peworld-hirejob-assets/ss-website/Hiring_am4xsu.png" alt="Hiring" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717531088/peworld-hirejob-assets/ss-website/Chat_wwn3m8.png" alt="Chat" width=100%/></td>
        </tr>
    </table>  
</p>

## Contribution

Contributions that make the open source community the best place to learn and create. Every contribution you make is valuable.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your/branch`)
3. Commit your Changes (`git commit -m 'Add some new feature'`)
4. Push to the Branch (`git push origin feature/yourbranch`)
5. Open a Pull Request

## Related Project

- [Peworld Hirejob Web Demo](https://hirejob-project.vercel.app/)
- [Peworld Hirejob Web Frontend Repository](https://github.com/rikiprimus/FE-hirejob)

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
