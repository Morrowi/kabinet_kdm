<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div class="col-lg-2 bg-black mobMenuWrap">
        <div class="p-2 h-100">
          <div class="d-flex flex-column justify-content-between leftMenuBlockH  h-100">
            <div class="mb-5 stickyTop">
              <div class="d-flex mb-3 align-items-center mb-4">
                <div class="kdmLogo me-2">
                  <img src="./../assets/image/kdm-logo.svg" alt="logo">
                </div>
                <div class="f-14 color-1">
                  Клиника доброго
                  <br>
                  <span class="color-white">маркетолога</span>
                </div>
              </div>
              <ul class="menuLinkBody">
                <li class="d-flex mb-4">
                  <router-link to="/admin" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Главная
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/admin/rates/" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Тарифы
                      </div>
                    </div>
                    <ul>
                      <li><router-link to="/admin/rates/add" >Добавить тариф</router-link></li>
                    </ul>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/admin/users" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Пользователи
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/admin/reviews" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Отзывы
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/admin/noty" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Уведомления
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/admin/support/" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Поддержка
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/admin/mail" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Почта
                      </div>
                    </div>
                    <ul>
                      <li><router-link to="/admin/mail/type" >Типы событий</router-link></li>
                      <li><router-link to="/admin/mail/list" >Почтовые шаблона</router-link></li>
                      <li><router-link to="/admin/mail/add" >Добавить</router-link></li>

                    </ul>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <a href="javascript:void(0);"  @click="logOut">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9023 11.58C18.26 11.77 18.536 12.07 18.7301 12.37C19.1083 12.99 19.0776 13.75 18.7097 14.42L17.9943 15.62C17.6162 16.26 16.911 16.66 16.1855 16.66C15.8278 16.66 15.4292 16.56 15.1022 16.36C14.8365 16.19 14.5299 16.13 14.2029 16.13C13.1911 16.13 12.3429 16.96 12.3122 17.95C12.3122 19.1 11.372 20 10.1968 20H8.80692C7.62145 20 6.68125 19.1 6.68125 17.95C6.66081 16.96 5.81259 16.13 4.80085 16.13C4.46361 16.13 4.15702 16.19 3.90153 16.36C3.5745 16.56 3.16572 16.66 2.81825 16.66C2.08245 16.66 1.37729 16.26 0.99917 15.62L0.29402 14.42C-0.0841044 13.77 -0.104544 12.99 0.273581 12.37C0.437094 12.07 0.743681 11.77 1.09115 11.58C1.37729 11.44 1.56125 11.21 1.73498 10.94C2.24596 10.08 1.93937 8.95 1.07071 8.44C0.0589696 7.87 -0.268057 6.6 0.314459 5.61L0.99917 4.43C1.59191 3.44 2.85913 3.09 3.88109 3.67C4.77019 4.15 5.925 3.83 6.4462 2.98C6.60972 2.7 6.70169 2.4 6.68125 2.1C6.66081 1.71 6.77323 1.34 6.9674 1.04C7.34553 0.42 8.03024 0.02 8.77627 0H10.2172C10.9735 0 11.6582 0.42 12.0363 1.04C12.2203 1.34 12.3429 1.71 12.3122 2.1C12.2918 2.4 12.3838 2.7 12.5473 2.98C13.0685 3.83 14.2233 4.15 15.1226 3.67C16.1344 3.09 17.4118 3.44 17.9943 4.43L18.679 5.61C19.2718 6.6 18.9447 7.87 17.9228 8.44C17.0541 8.95 16.7475 10.08 17.2687 10.94C17.4322 11.21 17.6162 11.44 17.9023 11.58ZM6.60979 10.01C6.60979 11.58 7.90767 12.83 9.51215 12.83C11.1166 12.83 12.3838 11.58 12.3838 10.01C12.3838 8.44005 11.1166 7.18005 9.51215 7.18005C7.90767 7.18005 6.60979 8.44005 6.60979 10.01Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Выйти
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-10 px-0">
        <div class="vh-100 overflow-auto">
          <div class="d-flex bg-white p-3 justify-content-between align-items-center mb-3 sticky-top">
            <a href="#">
              <div class="d-flex align-items-center massageTopWrap active">
                <div class="bellBlock me-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_250_45995)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 6.79633C16.7071 8.05226 17.039 8.79253 17.7695 9.64559C18.3231 10.2741 18.5 11.0808 18.5 11.956C18.5 12.8302 18.2128 13.6601 17.6373 14.3339C16.884 15.1417 15.8215 15.6573 14.7372 15.747C13.1659 15.8809 11.5937 15.9937 10.0005 15.9937C8.40634 15.9937 6.83505 15.9263 5.26375 15.747C4.17846 15.6573 3.11602 15.1417 2.36367 14.3339C1.78822 13.6601 1.5 12.8302 1.5 11.956C1.5 11.0808 1.6779 10.2741 2.23049 9.64559C2.98384 8.79253 3.29392 8.05226 3.29392 6.79633V6.3703C3.29392 4.68834 3.71333 3.58852 4.577 2.51186C5.86106 0.941697 7.91935 0 9.95577 0H10.0452C12.1254 0 14.2502 0.987019 15.5125 2.62466C16.3314 3.67916 16.7071 4.73265 16.7071 6.3703V6.79633ZM7.07367 18.0608C7.07367 17.5573 7.53582 17.3266 7.96318 17.2279C8.46309 17.1222 11.5093 17.1222 12.0092 17.2279C12.4366 17.3266 12.8987 17.5573 12.8987 18.0608C12.8738 18.5402 12.5926 18.9653 12.204 19.2352C11.7001 19.628 11.1088 19.8767 10.4906 19.9664C10.1487 20.0107 9.81276 20.0117 9.48279 19.9664C8.86362 19.8767 8.27227 19.628 7.76938 19.2342C7.37978 18.9653 7.09852 18.5402 7.07367 18.0608Z" fill="#6A7686"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_250_45995">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="f-14 fw-400 color-blue messOn">
                  Новых уведомлений <span>2</span>
                </div>
                <div class="f-14 fw-400 color-2 messOff">
                  Нет новых уведомлений
                </div>
              </div>
            </a>
            <div class="d-flex align-items-center userTopWrap me-0 me-lg-5">
              <div class="imgUserTop me-2">
                <img src="../assets/image/user.png" alt="">
              </div>
              <div class="f-14 fw-400">
                {{ currentUser.username }}
              </div>
            </div>
            <div class="mobMenuButton">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
    };
  },
  methods:{
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },

  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        console.log(response.data);
        if(response.data.roles === null || response.data.roles === 0){
          this.$router.push("/dashboard");
        } else if(response.data.roles === 2){
          this.$router.push("/mod");
        }
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
