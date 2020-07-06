<template>
  <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
      <filter id="outer-shadow" height="300%" width="300%" x="-100%" y="-100%">
        <feFlood flood-color="rgba(201, 201, 201, 1)" result="flood"></feFlood>
        <feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite>
        <feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur>
        <feOffset dx="0" dy="0" result="offset"></feOffset>
        <feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite>
      </filter>
      <filter id="eye-shadow" height="300%" width="300%" x="-100%" y="-100%">
        <feFlood flood-color="rgba(0, 0, 0, 1)" result="flood"></feFlood>
        <feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite>
        <feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur>
        <feOffset dx="0" dy="0" result="offset"></feOffset>
        <feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite>
      </filter>
      <linearGradient x1="0" x2="0" y1="0" y2="1" id="main-gradient">
        <stop offset="0%" stop-color="#ff6f00" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="#820000" stop-opacity="1"></stop>
      </linearGradient>
      <radialGradient id="left-eye-gradient">
        <stop offset="0%" stop-color="#79b0fa" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="#3b454f" stop-opacity="1"></stop>
      </radialGradient>
      <radialGradient id="right-eye-gradient">
        <stop offset="0%" stop-color="#77d815" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="#295b0b" stop-opacity="1"></stop>
      </radialGradient>
    </defs>
    <g transform="translate(25.6, 25.6) scale(0.9, 0.9) rotate(0, 256, 256)">
      <path d="M256.8 23.098C237.47 95.248 57.848 168.408 53.84 293.922C50.72 391.609 147.724 427.29 215.604 383.637L171.364 500.234L195.971 500.234L209.937 459.204L227.627 465.227L215.712 500.234L243.535 500.234L243.535 475.807L262.223 475.807L262.223 500.234L292.517 500.234L280.599 465.227L298.289 459.205L312.257 500.235L336.899 500.235L291.126 379.6C357.931 430.817 456.048 393.24 459.166 293.92C462.94 173.638 274.493 89.128 256.8 23.098Z" class="selected" fill="url(#main-gradient)" filter="url(#outer-shadow)"></path>
      <path d="M110.458 248.4C115.474 267.03 130.203 283.444 148.298 294.953C142.513 298.088 138.585 304.213 138.585 311.253C138.585 321.487 146.881 329.783 157.115 329.783C167.348 329.783 175.645 321.487 175.645 311.253C175.645 310.008 175.515 308.793 175.28 307.615C192.657 313.143 210.33 313.937 224.062 308.195C224.066 308.475 224.084 308.752 224.084 309.033C224.084 349.433 191.532 381.986 151.131 381.986C110.731 381.986 78.179 349.438 78.179 309.033C78.179 283.71 90.967 261.473 110.459 248.4Z" fill="url(#left-eye-gradient)" filter="url(#eye-shadow)"></path>
      <path d="M398.838 248.734C418.053 261.85 430.63 283.922 430.63 309.034C430.63 349.434 398.077 381.986 357.676 381.986C317.274 381.986 284.723 349.438 284.723 309.033C284.723 308.673 284.745 308.317 284.75 307.957C296.164 312.921 310.39 313.275 324.93 310.084C324.905 310.474 324.87 310.859 324.87 311.254C324.87 321.487 333.167 329.784 343.4 329.784C353.634 329.784 361.93 321.487 361.93 311.254C361.93 305.998 359.73 301.264 356.215 297.891C376.393 286.397 393.28 268.871 398.835 248.735Z" fill="url(#right-eye-gradient)" filter="url(#eye-shadow)"></path>
      <path d="M255.308 360.658L287.045 441.408L223.102 441.408L255.307 360.658Z" fill="#222222" fill-opacity="1"></path>
      <path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z" class="house" transform="translate(175, 105) scale(0.3, 0.3)"></path>
    </g>
  </svg>
</template>
