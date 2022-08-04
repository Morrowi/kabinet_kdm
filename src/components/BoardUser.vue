<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div class="col-lg-2 bg-black mobMenuWrap" :class="mobMenu" id="js__mobMenuWrap">
        <div class="p-xl-2 h-100">
          <div class="d-flex flex-column justify-content-between leftMenuBlockH  h-100">
            <div class="mb-5 stickyTop">

                <router-link class="d-flex mb-3 align-items-center mb-4"  to="/dashboard">
                <div class="kdmLogo me-2">
                  <img src="./../assets/image/kdm-logo.svg" alt="logo">
                </div>
                <div class="f-14 color-1">
                  Клиника доброго
                  <br>
                  <span class="color-white">маркетолога</span>
                </div>
                </router-link>

              <ul class="menuLinkBody">
                <li class="d-flex firstBlockMenu">
                  <router-link to="/dashboard" active-class="active">
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
                        Основная информация
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/marketer" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5 0C7.96127 0 5.90323 2.03766 5.90323 4.55123C5.90323 7.06481 7.96127 9.10246 10.5 9.10246C13.0387 9.10246 15.0968 7.06481 15.0968 4.55123C15.0968 2.03766 13.0387 0 10.5 0Z" fill="#6A7686"/>
                          <path d="M5.59677 11.5298C3.05805 11.5298 1 13.5674 1 16.081V17.5232C1 18.4374 1.66915 19.2168 2.5804 19.3641C7.82541 20.212 13.1746 20.212 18.4196 19.3641C19.3309 19.2168 20 18.4374 20 17.5232V16.081C20 13.5674 17.942 11.5298 15.4032 11.5298H14.9854C14.7592 11.5298 14.5345 11.5652 14.3195 11.6347L13.2586 11.9777C11.4661 12.5572 9.53391 12.5572 7.74143 11.9777L6.68048 11.6347C6.46549 11.5652 6.24077 11.5298 6.01461 11.5298H5.59677Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Мой маркетолог
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/tasks" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.47489 0.304838C8.11746 -0.101613 11.8825 -0.101613 15.5251 0.304838C16.8927 0.457438 18.0932 1.1958 18.8527 2.26811L9.41014 11.6953L6.49652 8.78643C6.15098 8.44145 5.59074 8.44145 5.2452 8.78643C4.89965 9.13141 4.89965 9.69074 5.2452 10.0357L8.78448 13.5693C9.13002 13.9143 9.69026 13.9143 10.0358 13.5693L19.6101 4.01052C19.6366 4.13957 19.6577 4.27062 19.6733 4.40343C20.1089 8.12181 20.1089 11.8782 19.6733 15.5966C19.4198 17.7602 17.6798 19.4547 15.5251 19.6952C11.8825 20.1016 8.11746 20.1016 4.47489 19.6952C2.3202 19.4547 0.580173 17.7602 0.326703 15.5966C-0.108901 11.8782 -0.108901 8.12181 0.326703 4.40343C0.580173 2.23977 2.3202 0.545267 4.47489 0.304838Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Задачи
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/reports" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.2336 0.208852C9.2336 0.0858126 9.12818 -0.0112936 9.00577 0.00106776C3.94783 0.51181 0 4.78234 0 9.97495C0 15.5116 4.48837 20 10.025 20C12.8075 20 15.3254 18.866 17.1411 17.0363C17.2279 16.9489 17.2183 16.8061 17.1225 16.7287L9.52757 10.5905C9.34164 10.4402 9.2336 10.214 9.2336 9.97495V0.208852Z" fill="#6A7686"/>
                          <path d="M18.1184 15.4983C18.2141 15.5756 18.3556 15.5551 18.4229 15.4521C19.2767 14.1456 19.834 12.6273 19.9989 10.9937C20.0113 10.8713 19.9141 10.7664 19.7911 10.7664H12.8604C12.6614 10.7664 12.573 11.0165 12.7277 11.1416L18.1184 15.4983Z" fill="#6A7686"/>
                          <path d="M19.7911 9.18349C19.9142 9.18349 20.0113 9.07813 19.9989 8.95571C19.522 4.23289 15.7671 0.477939 11.0443 0.0010623C10.9219 -0.0112984 10.8165 0.0858128 10.8165 0.208852V8.86691C10.8165 9.04175 10.9582 9.18349 11.1331 9.18349H19.7911Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Отчеты по рекламе
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/inpayac" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81 0H14.191C17.28 0 19 1.78 19 4.83V15.16C19 18.26 17.28 20 14.191 20H5.81C2.77 20 1 18.26 1 15.16V4.83C1 1.78 2.77 0 5.81 0ZM6.08 4.66V4.65H9.069C9.5 4.65 9.85 5 9.85 5.429C9.85 5.87 9.5 6.22 9.069 6.22H6.08C5.649 6.22 5.3 5.87 5.3 5.44C5.3 5.01 5.649 4.66 6.08 4.66ZM6.08 10.74H13.92C14.35 10.74 14.7 10.39 14.7 9.96C14.7 9.53 14.35 9.179 13.92 9.179H6.08C5.649 9.179 5.3 9.53 5.3 9.96C5.3 10.39 5.649 10.74 6.08 10.74ZM6.08 15.31H13.92C14.319 15.27 14.62 14.929 14.62 14.53C14.62 14.12 14.319 13.78 13.92 13.74H6.08C5.78 13.71 5.49 13.85 5.33 14.11C5.17 14.36 5.17 14.69 5.33 14.95C5.49 15.2 5.78 15.35 6.08 15.31Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Счета, оплаты, акты
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/notifications" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
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
                      <div class="menuLinkName fw-500 f-14">
                        Уведомления
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/rate" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.6514 0.526328C12.6514 0.31533 12.5146 0.124727 12.3038 0.0420742C12.0931 -0.0405782 11.8491 0.000698393 11.6839 0.146943L9.65199 1.94649C6.62659 4.62586 4.07022 7.72082 2.07384 11.1212C2.02683 11.1976 2 11.286 2 11.3801C2 11.6708 2.25584 11.9065 2.57143 11.9065H7.49714V19.4737C7.49714 19.6821 7.63067 19.8709 7.83766 19.9551C8.04465 20.0393 8.2861 20.0031 8.45338 19.8628L9.36254 19.1C12.5451 16.4298 15.2459 13.3101 17.3637 9.85791L17.9261 8.94122C18.026 8.77827 18.0245 8.57869 17.9221 8.41704C17.8197 8.25538 17.6318 8.15599 17.4286 8.15599H12.6514V0.526328Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14 me-3">
                        Тариф
                      </div>
                      <!-- без класса active -- нет оплаты  -->
                      <div class="tarifTabletInfo" :class="{'active':pay}">
                        <span v-if="pay">Активен</span>
                        <span v-else>Ждет оплату</span>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/dashboard/profile" active-class="active">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9023 11.58C18.26 11.77 18.536 12.07 18.7301 12.37C19.1083 12.99 19.0776 13.75 18.7097 14.42L17.9943 15.62C17.6162 16.26 16.911 16.66 16.1855 16.66C15.8278 16.66 15.4292 16.56 15.1022 16.36C14.8365 16.19 14.5299 16.13 14.2029 16.13C13.1911 16.13 12.3429 16.96 12.3122 17.95C12.3122 19.1 11.372 20 10.1968 20H8.80692C7.62145 20 6.68125 19.1 6.68125 17.95C6.66081 16.96 5.81259 16.13 4.80085 16.13C4.46361 16.13 4.15702 16.19 3.90153 16.36C3.5745 16.56 3.16572 16.66 2.81825 16.66C2.08245 16.66 1.37729 16.26 0.99917 15.62L0.29402 14.42C-0.0841044 13.77 -0.104544 12.99 0.273581 12.37C0.437094 12.07 0.743681 11.77 1.09115 11.58C1.37729 11.44 1.56125 11.21 1.73498 10.94C2.24596 10.08 1.93937 8.95 1.07071 8.44C0.0589696 7.87 -0.268057 6.6 0.314459 5.61L0.99917 4.43C1.59191 3.44 2.85913 3.09 3.88109 3.67C4.77019 4.15 5.925 3.83 6.4462 2.98C6.60972 2.7 6.70169 2.4 6.68125 2.1C6.66081 1.71 6.77323 1.34 6.9674 1.04C7.34553 0.42 8.03024 0.02 8.77627 0H10.2172C10.9735 0 11.6582 0.42 12.0363 1.04C12.2203 1.34 12.3429 1.71 12.3122 2.1C12.2918 2.4 12.3838 2.7 12.5473 2.98C13.0685 3.83 14.2233 4.15 15.1226 3.67C16.1344 3.09 17.4118 3.44 17.9943 4.43L18.679 5.61C19.2718 6.6 18.9447 7.87 17.9228 8.44C17.0541 8.95 16.7475 10.08 17.2687 10.94C17.4322 11.21 17.6162 11.44 17.9023 11.58ZM6.60979 10.01C6.60979 11.58 7.90767 12.83 9.51215 12.83C11.1166 12.83 12.3838 11.58 12.3838 10.01C12.3838 8.44005 11.1166 7.18005 9.51215 7.18005C7.90767 7.18005 6.60979 8.44005 6.60979 10.01Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Профиль
                      </div>
                    </div>
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
              <router-link class="button buttonBorderBlack  mt-4" to="/dashboard/support" active-class="active">
              Написать в поддержку
              </router-link>

          </div>
        </div>
      </div>
      <div class="col-lg-10 px-0">
        <div class="vh-100 overflow-auto">
          <div class="d-flex bg-white p-3 justify-content-between align-items-center mb-3 sticky-top">
            <bellNoty/>
            <router-link to="/dashboard/profile" class="d-flex align-items-center userTopWrap me-0 me-lg-5">
              <div class="imgUserTop me-2">
                <div v-if="image !== null">
                  <Avatar shape="circle" :image="image" />
                </div>
                <div v-else>
                  <Avatar icon="pi pi-user" class="mr-2"  shape="circle" />
                </div>
              </div>
              <div class="f-14 fw-400">
                {{username }}
              </div>
            </router-link>
            <div id="btn-showMenu" class="mobMenuButton" :class="mobMenu" @click="openMenu">
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
    <div
        id="warp_openChat"
        v-if="showLauncher"
        class="sc-launcher"
        :class="{opened: isOpen}"
        :style="{backgroundColor: colors.launcher.bg}"
        @click.prevent="isOpen ? close() : openAndFocus()"
    >
      <img v-if="isOpen" class="sc-closed-icon" :src="icons.close.img" :alt="icons.close.name" />
      <img v-else class="sc-open-icon" :src="icons.open.img" :alt="icons.open.name" />
    </div>
    <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">
      <chat-window
          :height="'100%'"
          :current-user-id="currentUserId"
          :rooms="room"
          :rooms-list-opened ="roomsListOpened"
          :rooms-loaded="roomsLoaded"
          :show-add-room="showAddRoom"
          :show-search="showSearch"
          :show-reaction-emojis="showReactionEmojis"
          :loading-rooms="loadingRooms"
          :single-room="singleRoom"
          :show-footer="true"
          :messages="messages"
          :messages-loaded="messagesLoaded"
          :text-messages="textMessages"
          :message-actions="messageActions"
          @fetch-messages="onFetchMessages"
          @send-message="sendMessage"
          @open-file ="openFile"
          @delete-message="deleteMessage"
          @edit-message="editMessage"
      />
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import bellNoty from "./bell-noty"
import CloseIcon from '../assets/image/close-icon.png'
import OpenIcon from '../assets/image/logo-no-bg.svg'
import Avatar from 'primevue/avatar';

import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
import {io} from "socket.io-client";
import axios from "axios";
import authHeader from "@/services/auth-header";

const socket = io('http://panel.kdm1.biz/', {  path: "/api/chat" });


export default {
  name: "User",
  components: {
    bellNoty,
    ChatWindow,
    Avatar
  },
  created() {

  },
  data() {
    //let getItem = window.localStorage.getItem("user");
   let user =  JSON.parse(localStorage.getItem('user'));
    //console.log('user 272  ',user);
    //let user = this.$store.state.auth.user;
    //console.log(user.avatar);
    let image = null;
    if(user.avatar !== null){
      image = 'http://panel.kdm1.biz/uploads/'+user.id+'/'+user.avatar;
    }

    return {
      pay:false,
      image,
      username:user.username,
      mobMenu:'',
      icons :{
        open: {
          img: OpenIcon
        },
        close: {
          img: CloseIcon
        }
      },
      content: "",
      isOpen:false,
      showLauncher: true,
      colors: {
        launcher: {
          bg: '#ee7459'
        },
      },
      //chat
      messageActions:
        [
            {
              name: 'replyMessage',
              title: 'Ответить'
            },
            {
              name: 'editMessage',
              title: 'Отредактировать',
                onlyMe: true
            },
            {
              name: 'deleteMessage',
                  title: 'Удалить сообщение',
                  onlyMe: true
            },
            {
              name: 'selectMessages',
              title: 'Выбрать'
            }
          ],
      textMessages:{
        ROOMS_EMPTY: 'Чат не выбран',
        ROOM_EMPTY: 'Комната не выбрана',
        NEW_MESSAGES: 'Новое сообщение',
        MESSAGE_DELETED: 'Сообщение удалено',
        MESSAGES_EMPTY: 'Сообщений нет',
        CONVERSATION_STARTED: 'Сообщение отправлено:',
        TYPE_MESSAGE: 'Введите сообщениe',
        SEARCH: 'Поиск',
      },
      room: [],
      roomsLoaded: true,
      showSearch:true,
      roomsListOpened: false,
      showAddRoom:false,
      showReactionEmojis:false,
      singleRoom:true,
      messagesLoaded: false,
      loadingRooms: false,
      messages: [],
      currentUserId: user.id
    };
  },
  methods:{
    openMenu(){
      if(this.mobMenu === 'active'){
        this.mobMenu = '';
      } else {
        this.mobMenu = 'active';
      }
    },
    closeMenu(){
      this.mobMenu = '';
    },
    close() {
      this.isOpen = false;
    },
    openAndFocus() {
      this.isOpen = true;
    },


    //chat
    getRooms(){
      socket.on("get room", data => {
        this.room=[data];
      });
    },
    getMsg(){
      socket.on("message_m", data => {
        console.log('[line 63]',data);
        /*let tmpMessage = [...this.messages, ...data];*/
        this.messages.push(data.msg);
        //console.log('[this.messages]',this.messages);
      });
    },
    editMsg(){
      socket.on("edit_message", data => {
        console.log('[line 362]',data);
        for (let k in this.messages){
          if(this.messages[k]._id === data.msg._id){
            this.messages[k] = data.msg;
          }
        }
        /*let tmpMessage = [...this.messages, ...data];*/
        //this.messages.push(data.msg);
        console.log('[this.messages]',this.messages);
      });
    },
    loadRoom(){
      let user =  JSON.parse(localStorage.getItem('user'));
      let join ={
        is: 'user',
        rooms:{
          room: user.room,
          id: user.id,
          manager: user.manager.id
        },
      }
      //console.log('399 user',user);
      //console.log('395 line', join);
      socket.emit("subscribe", join);
    },
    onFetchMessages(data) {
      //console.log('178 line', data);


      socket.emit("get msg", data.room.roomId);

      socket.on("load msg", data => {
        setTimeout(() => {
          this.messages= data;
          this.messagesLoaded = true;
        })
      });

    },
    async sendMessage({ content, roomId, files, replyMessage }) {
      const message = {
        sender_id: this.currentUserId,
        content,
        timestamp: new Date()
      }
      if (files) {
        message.files = await this.formattedFiles(files)
      }
      let dataMsg = {
        room: roomId,
        message:message
      }
      console.log(replyMessage)
      socket.emit("message_m", dataMsg);

    },
    async formattedFiles(files) {
      const formattedFiles = []

      for (let i in files){
        let file =files[i];
        const messageFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.extension || file.type,
          url: file.url || file.localUrl
        }
        if (file.audio) {
          messageFile.audio = true
          messageFile.duration = file.duration
        }
        const blobFile = await fetch(file.localUrl).then(res => res.blob());
        console.log(blobFile);
        messageFile.b64 = await this.blobToBase64(blobFile);

        formattedFiles.push(messageFile)
      }

      return formattedFiles
    },
    async blobToBase64(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    openFile({ file }) {
      window.open(file.file.url, '_blank')
    },
    async deleteMessage({ message, roomId }) {
      message.deleted = 1;
      console.log(roomId);
      console.log(message);

      let dataMsg = {
        room:roomId,
        message:message
      };
      socket.emit("deleted_msg", dataMsg);
      const { files } = message
      if (files) {
        files.forEach(file => {
          console.log(this.currentUserId, message._id, file);
        })
      }
    },
    async editMessage({ messageId, newContent, roomId }) {
      let dataMsg={
        messageId:messageId,
        newContent:newContent,
        room:roomId
      }
      socket.emit("edit_msg", dataMsg);
      for (let k in this.messages){
        if(this.messages[k]._id === messageId){
          this.messages[k].content = newContent;
        }
      }
    },
    //chat - end

    /*reUser() {
      this.$store.dispatch("auth/reuser");
    },*/

    initPaymend(){
      axios.post( 'http://panel.kdm1.biz/api/paymend/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{

       if(resp.data.length>0){
         this.pay=true;
       }
      }).catch(function(error){
        console.log(error);

      });
    },

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
    UserService.getUserBoard().then(
      (response) => {

        if(response.data.roles === 1){
          this.$router.push("/admin");
        } else if(response.data.roles === 2){
          this.$router.push("/mod");
        }
        if(this.currentUser.manager === null){
          this.$router.push("/");
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
    //this.reUser();
    //chat
    this.loadRoom();
    this.getRooms();
    this.getMsg();
    this.editMsg();
    this.initPaymend();
    //chat - end

  },
  beforeUnmount () {

  }
};
</script>
<style>
.sc-launcher {
  width: 60px;
  height: 60px;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
}
.sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
}
.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}
.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}
.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 1;
}
.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}
.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 1;
}
.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}
.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0, 0, 0, 0.2);
}

.sc-chat-window {
  width: 470px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  animation: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}

.sc-chat-window .vac-player-bar{
  max-width:calc(100% - 50px);
}

.sc-chat-window.closed {
  opacity: 0;
  display: none;
  bottom: 90px;
}
@keyframes fadeIn {
  0% {
    display: none;
    opacity: 0;
  }
  100% {
    display: flex;
    opacity: 1;
  }
}
.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}
@media (max-width: 450px) {
  .sc-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>