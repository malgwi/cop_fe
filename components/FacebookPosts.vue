<template>
    <div>
      <div class="facebook-container">
        <h1 class="facebook-heading">Facebook Posts</h1>
        <p>
            Catch up with all the lastest posts published.
        </p>
        <div class="w-auto">
          <div class="loading-container" v-if="!isFBLoaded">
            <div class="loader"></div>
          </div>
          <div
            class="fb-page w-auto h-auto"
            v-if="isFBLoaded"
            data-href="https://www.facebook.com/NCDCgov/"
            data-tabs="timeline, events"
            data-width="300"
            data-height="300"
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="true"
            data-show-facepile="false"
          >
            <blockquote
              cite="https://www.facebook.com/NCDCgov/"
              class="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/NCDCgov/">
                Nigeria Centre for Disease Control and Prevention
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "facebook",
    data() {
      return {
        isFBLoaded: false,
      };
    },
    head() {
      return {
        script: [
          {
            type: "text/javascript",
            id: "fb-root",
            src: "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v17.0",
            crossorigin: "anonymous",
            nonce: "YUeUIiYV",
            callback: () => {
              this.isFBLoaded = true;
            },
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  .facebook-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .facebook-heading {
    text-align: center;
    margin-bottom: 15px;
  }
  
  .w-auto {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    padding-bottom: 15px;
  }
  
  /* .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } */
  </style>
  