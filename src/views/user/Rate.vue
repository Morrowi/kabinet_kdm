<template>
  <transition name="fade" >
    <div class="loading" v-if="loading">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100"  xml:space="preserve">
        <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
          <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite" />
        </line>
        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
          <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite" />
        </line>
      </svg>
    </div>
    <div v-else class="d-flex justify-content-between me-0 ms-0 align-items-start">
      <div class="contentBlock mb-5">
        <div class="d-flex justify-content-between mb-3 flex-column">
          <div class="f-24 fw-600">
            Ваш тариф
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-lg-6 mb-3" >
            <div class=" b-radius bg-white formTarifItem"   >
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  {{selectRates.name}}
                </div>
                <div class="f-24 fw-600 color-orange">
                  {{selectRates.price}} ₽/месяц
                </div>
              </div>
              <div class="tarifItem p-3 border-bottom" v-for="prop in selectRates.props" :key="prop" >
                {{prop}}
              </div>
              <div class="d-flex me-0 ms-0 p-3 ">
<!--                  <div class="button blueButton px-4 px-xl-5 me-4">Оплатить онлайн</div>-->
                  <div class="button buttonBorder px-4 px-xl-5" @click="openPay" >Оплатить по счету</div>
              </div>

            </div>
          </div>
          <div class="col-lg-6 mb-3">
            <div class="bgTarif"></div>
            <!--<img class="w-100" src="image/tarifImg1.png" alt="">-->
          </div>
        </div>
        <div class="d-flex justify-content-between mb-3 flex-column">
          <div class="f-24 fw-600">
            Сменить тариф
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-lg-6 mb-3" v-for="rate in rates" :key="rate.id">
            <div class="b-radius bg-white">
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  {{ rate.name }}
                </div>
                <div class="f-24 fw-600 color-orange">
                  {{rate.price}} ₽/месяц
                </div>
              </div>
              <div class="tarifItem p-3 border-bottom" v-for="(prop, index) in rate.props" :key="index" >
                {{prop}}
              </div>
              <div class="d-flex me-0 ms-0 p-3">
                <div class="button blueButton px-5" @click="openConfirmation(rate.id)">Сменить тариф</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <Dialog header="Подтверждение" v-model:visible="displayConfirmation" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '350px'}" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle me-3" style="font-size: 2rem" />
      <span>Вы точно хотите сменить тариф?</span>
    </div>
    <template #footer>
      <Button label="Нет" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
      <Button label="Да" icon="pi pi-check" @click="changeTarif" class="p-button-text" autofocus />
    </template>
  </Dialog>
  <Dialog header="Заполните реквизиты и менеджер вышлет счет на почту" v-model:visible="displayPay" position="top" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
    <div class="border-bottom p-3 mb-3">

      <div class="mb-2">
        <label class="checkForm d-flex align-items-center" >
          <input class="d-none" type="radio"   value="1" v-model="paySys" @click="showPaySys(1)">
          <div class="blockRadio me-2"></div>
          <span class="f-16">Юридическое лицо</span>
        </label>
      </div>
      <div class="mb-2">
        <label class="checkForm d-flex align-items-center" >
          <input class="d-none" type="radio" value="2" v-model="paySys"  @click="showPaySys(2)">
          <div class="blockRadio me-2"></div>
          <span class="f-16">Индивидуальный предприниматель</span>
        </label>
      </div>
      <div class="mb-2">
        <label class="checkForm d-flex align-items-center" >
          <input class="d-none" type="radio" value="3" v-model="paySys"  @click="showPaySys(3)">
          <div class="blockRadio me-2"></div>
          <span class="f-16">Физическое лицо</span>
        </label>
      </div>
    </div>
    <form class="formPay p-3" action="" v-if="showSys === 1">
      <div class="row">
        <div class="col-12">
          <div class="f-16 mb-3">
            Реквизиты
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <InputText type="text" v-model="inn" class="w-100 formInput"  :class="{'p-invalid' : showInnError}" aria-describedby="inn-help" placeholder="ИНН" />
            <small id="inn-help" class="p-error" v-if="showInnError">{{textInnError}}</small>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <InputNumber v-model="kpp" class="w-100 formInput_pv" :class="{'p-invalid' : showKppError}" aria-describedby="kpp-help" placeholder="КПП" mode="decimal" :useGrouping="false" />
            <small id="kpp-help" class="p-error" v-if="showKppError">{{textKppError}}</small>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <InputNumber v-model="ogrn" class="w-100 formInput_pv"  :class="{'p-invalid' : showOgrnError}" aria-describedby="ogrn-help" placeholder="ОГРН" mode="decimal" :useGrouping="false" />
            <small id="ogrn-help" class="p-error" v-if="showOgrnError">{{textOgrnError}}</small>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <InputText type="text" v-model="name_organiz" class="w-100 formInput"  :class="{'p-invalid' : showNameOrganizError}" aria-describedby="NameOrganiz-help" placeholder="Юридическое название организации" />
            <small id="NameOrganiz-help" class="p-error" v-if="showNameOrganizError">{{textNameOrganizError}}</small>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <InputText type="text" v-model="ur_addres" class="w-100 formInput"  :class="{'p-invalid' : showUrAdressError}" aria-describedby="ur_addres-help" placeholder="Юридический адрес" />
            <small id="ur_addres-help" class="p-error" v-if="showUrAdressError">{{textUrAdressError}}</small>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <InputText type="text" v-model="mail_addres" class="w-100 formInput"  :class="{'p-invalid' : showMailAdressError}" aria-describedby="mail_addres-help" placeholder="Почтовый адрес" />
            <small id="mail_addres-help" class="p-error" v-if="showMailAdressError">{{textMailAdressError}}</small>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Контактная информация
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="contact" class="w-100 formInput"  :class="{'p-invalid' : showContactError}" aria-describedby="contact-help" placeholder="Контактное лицо" />
            <small id="contact-help" class="p-error" v-if="showContactError">{{textContactError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="contact_email" class="w-100 formInput"  :class="{'p-invalid' : showContactEmailError}" aria-describedby="contact_email-help" placeholder="Email" />
            <small id="contact_email-help" class="p-error" v-if="showContactEmailError">{{textContactEmailError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="contact_phone" class="w-100 formInput"  :class="{'p-invalid' : showContactPhoneError}" aria-describedby="contact_phone-help" placeholder="Контактный телефон" />
            <small id="contact_phone-help" class="p-error" v-if="showContactPhoneError">{{textContactPhoneError}}</small>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Как вы будете забирать документы
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <Dropdown class="w-100 formInput" v-model="pick_up_documents" :options="select_pick_up_documents" optionLabel="name" optionValue="code" placeholder="Выбрать" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group" v-if="pick_up_documents === 'edo'">
            <input v-model="name_edo" type="text" autofocus class="w-100 formInput" placeholder="Наименование системы ЭДО">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Банк
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="bank_name" class="w-100 formInput"  :class="{'p-invalid' : showNameBankError}" aria-describedby="bank_name-help" placeholder="Название банка" />
            <small id="bank_name_phone-help" class="p-error" v-if="showNameBankError">{{textNameBankError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="bank_bik" class="w-100 formInput"  :class="{'p-invalid' : showBankBikError}" aria-describedby="bank_bik-help" placeholder="БИК" />
            <small id="bank_bik-help" class="p-error" v-if="showBankBikError">{{textBankBikError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputNumber v-model="bank_rs" class="w-100 formInput_pv" :class="{'p-invalid' : showBankRsError}" aria-describedby="bank_rs-help" placeholder="Р/С" mode="decimal" :useGrouping="false" />
            <small id="bank_rs-help" class="p-error" v-if="showBankRsError">{{textBankRsError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputNumber v-model="bank_ks" class="w-100 formInput_pv" :class="{'p-invalid' : showBankKsError}" aria-describedby="bank_ks-help" placeholder="К/С" mode="decimal" :useGrouping="false" />
            <small id="bank_ks-help" class="p-error" v-if="showBankKsError">{{textBankKsError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="bank_mail" class="w-100 formInput"  :class="{'p-invalid' : showBankMailError}" aria-describedby="bank_mail-help" placeholder="Контактная почта" />
            <small id="bank_mail-help" class="p-error" v-if="showBankMailError">{{textBankMailError}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <InputText type="text" v-model="bank_phone" class="w-100 formInput"  :class="{'p-invalid' : showBankPhoneError}" aria-describedby="bank_phone-help" placeholder="Контактный телефон" />
            <small id="bank_phone-help" class="p-error" v-if="showBankPhoneError">{{textBankPhoneError}}</small>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck me-2"></div>
              <span class="f-12">Я ознакомился с условиями <a class="color-blue" href="#">договора</a>, согласен с ними</span>
            </label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck me-2"></div>
              <span class="f-12">Я соглашаюсь с <a class="color-blue" href="javascript:void(0);" @click="displayPolit=true;">политикой конфиденциальности</a> и даю согласие на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </div>
    </form>
    <form class="formPay p-3" action="" v-if="showSys === 2">
      <div class="row">
        <div class="col-12">
          <div class="f-16 mb-3">
            Реквизиты
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="ИНН">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="КПП">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Юридическое название организации">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Юридический адрес">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Контактная информация
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактное лицо">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Как вы будете забирать документы
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <select name="select" class="w-100 formInput task" id="selectIp">
              <option selected value="">Системой ЭДО</option>
              <option value="Напомнить за 2 деня">Системой ЭДО1</option>
              <option value="Напомнить за неденю">Системой ЭДО2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Наименование системы ЭДО">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Банк
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактное лицо">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck me-2"></div>
              <span class="f-12">Я ознакомился с условиями <a class="color-blue" href="#">договора</a>, согласен с ними</span>
            </label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck me-2"></div>
              <span class="f-12">Я соглашаюсь с <a class="color-blue" href="#">политикой конфиденциальности</a> и даю согласие на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </div>
    </form>
    <form class="formPay p-3" action="" v-if="showSys === 3">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Фамилия">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Имя">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Отчество">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <select name="select" class="w-100 formInput task" id="selectFiz">
              <option selected value="">Способ получения чека</option>
              <option value="Системой ЭДО">Системой ЭДО</option>
              <option value="Напомнить за 2 деня">Системой ЭДО1</option>
              <option value="Напомнить за неденю">Системой ЭДО2</option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck me-2"></div>
              <span class="f-12">Я соглашаюсь с <a class="color-blue" href="#">политикой конфиденциальности</a> и даю согласие на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <Button label="Отмена" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
      <Button label="Отправить счет" class="button buttonBorder" @click="sendForm" autofocus />
    </template>
  </Dialog>
  <Dialog header="Политика в отношении обработки персональ­ных данных" v-model:visible="displayPolit" position="top" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
    <div class="privacy">
      <h2 class="privacy-main__li">1.&nbsp;Общие положения</h2>
      <p>Настоящая политика обработки персональных данных составлена в&nbsp;соответствии с&nbsp;требованиями
        Федерального закона от&nbsp;27.07.2006. №&nbsp;152-ФЗ «О&nbsp;персональных данных»
        и&nbsp;определяет порядок обработки персональных данных и&nbsp;меры по&nbsp;обеспечению безопасности
        персональных данных, предпринимаемые ООО «Хороший маркетинг» (далее&nbsp;— Оператор).
      </p>
      <p>1.1.&nbsp;Оператор ставит своей важнейшей целью и&nbsp;условием осуществления своей деятельности соблюдение
        прав и&nbsp;свобод человека и&nbsp;гражданина при обработке его персональных данных, в&nbsp;том числе
        защиты прав на&nbsp;неприкосновенность частной жизни, личную и&nbsp;семейную тайну.</p>
      <p>1.2.&nbsp;Настоящая политика Оператора в&nbsp;отношении обработки персональных данных (далее&nbsp;—
        Политика) применяется ко&nbsp;всей информации, которую Оператор может получить о&nbsp;посетителях
        веб-сайта <a href="/">http://kdm1.ru</a>.</p>

      <h2 class="privacy-main__li">2.&nbsp; Основные понятия, используемые в&nbsp;Политике</h2>
      <p>2.1.&nbsp;Автоматизированная обработка персональных данных&nbsp;— обработка персональных данных
        с&nbsp;помощью средств вычислительной техники;</p>
      <p>2.2.&nbsp;Блокирование персональных данных&nbsp;— временное прекращение обработки персональных данных
        (за&nbsp;исключением случаев, если обработка необходима для уточнения персональных данных);</p>
      <p>2.3.&nbsp;Веб-сайт&nbsp;— совокупность графических и&nbsp;информационных материалов, а&nbsp;также
        программ для ЭВМ и&nbsp;баз данных, обеспечивающих их&nbsp;доступность в&nbsp;сети интернет
        по&nbsp;сетевому адресу <a href="/">http://kdm1.ru</a>;</p>
      <p>2.4.&nbsp; Информационная система персональных данных&nbsp;— совокупность содержащихся в&nbsp;базах
        данных персональных данных, и&nbsp;обеспечивающих их&nbsp;обработку информационных технологий
        и&nbsp;технических средств;</p>
      <p>2.5.&nbsp;Обезличивание персональных данных&nbsp;— действия, в&nbsp;результате которых невозможно
        определить без использования дополнительной информации принадлежность персональных данных конкретному
        Пользователю или иному субъекту персональных данных;</p>
      <p>2.6.&nbsp;Обработка персональных данных&nbsp;— любое действие (операция) или совокупность действий
        (операций), совершаемых с&nbsp;использованием средств автоматизации или без использования таких средств
        с&nbsp;персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение
        (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ),
        обезличивание, блокирование, удаление, уничтожение персональных данных;</p>
      <p>2.7.&nbsp;Оператор&nbsp;— государственный орган, муниципальный орган, юридическое или физическое лицо,
        самостоятельно или совместно с&nbsp;другими лицами организующие&nbsp;и (или) осуществляющие обработку
        персональных данных, а&nbsp;также определяющие цели обработки персональных данных, состав персональных
        данных, подлежащих обработке, действия (операции), совершаемые с&nbsp;персональными данными;</p>
      <p>2.8.&nbsp;Персональные данные&nbsp;— любая информация, относящаяся прямо или косвенно
        к&nbsp;определенному или определяемому Пользователю веб-сайта <a href="/">http://kdm1.ru</a>;</p>
      <p>2.9.&nbsp;Пользователь&nbsp;— любой посетитель веб-сайта <a href="/">http://kdm1.ru</a>;</p>
      <p>2.10.&nbsp;Предоставление персональных данных&nbsp;— действия, направленные на&nbsp;раскрытие
        персональных данных определенному лицу или определенному кругу лиц;</p>
      <p>2.11.&nbsp;Распространение персональных данных&nbsp;— любые действия, направленные на&nbsp;раскрытие
        персональных данных неопределенному кругу лиц (передача персональных данных) или на&nbsp;ознакомление
        с&nbsp;персональными данными неограниченного круга лиц, в&nbsp;том числе обнародование персональных
        данных в&nbsp;средствах массовой информации, размещение в&nbsp;информационно-телекоммуникационных сетях
        или предоставление доступа к&nbsp;персональным данным каким-либо иным способом;</p>
      <p>2.12.&nbsp;Трансграничная передача персональных данных&nbsp;— передача персональных данных
        на&nbsp;территорию иностранного государства органу власти иностранного государства, иностранному
        физическому или иностранному юридическому лицу;</p>
      <p>2.13.&nbsp;Уничтожение персональных данных&nbsp;— любые действия, в&nbsp;результате которых персональные
        данные уничтожаются безвозвратно с&nbsp;невозможностью дальнейшего восстановления содержания
        персональных данных в&nbsp;информационной системе персональных данных&nbsp;и (или) уничтожаются
        материальные носители персональных данных.</p>

      <h2 class="privacy-main__li">3.&nbsp;Оператор может обрабатывать следующие персональные данные Пользователя</h2>
      <p>3.1.&nbsp;Фамилия, имя, отчество;</p>
      <p>3.2.&nbsp;Электронный адрес;</p>
      <p>3.3.&nbsp;Номера телефонов;</p>
      <p>3.4.&nbsp;Также на&nbsp;сайте происходит сбор и&nbsp;обработка обезличенных данных о&nbsp;посетителях
        (в&nbsp;т.ч. файлов «cookie») с&nbsp;помощью сервисов интернет-статистики (Яндекс Метрика
        и&nbsp;Гугл Аналитика и&nbsp;других).</p>
      <p>3.5.&nbsp;Вышеперечисленные данные далее по&nbsp;тексту Политики объединены общим понятием Персональные
        данные.</p>

      <h2 class="privacy-main__li">4.&nbsp;Цели обработки персональных данных</h2>
      <p>4.1.&nbsp;Цель обработки персональных данных Пользователя&nbsp;— информирование Пользователя посредством
        отправки электронных писем; заключение, исполнение и&nbsp;прекращение гражданско-правовых договоров.</p>
      <p>4.2.&nbsp;Также Оператор имеет право направлять Пользователю уведомления о&nbsp;новых продуктах
        и&nbsp;услугах, специальных предложениях и&nbsp;различных событиях. Пользователь всегда может отказаться
        от&nbsp;получения информационных сообщений, направив Оператору письмо на&nbsp;адрес электронной почты <a href="mailto:hello@kdm1.ru">hello@kdm1.ru</a> с&nbsp;пометкой «Отказ от&nbsp;уведомлений
        о&nbsp;новых продуктах и&nbsp;услугах и&nbsp;специальных предложениях».</p>
      <p>4.3.&nbsp;Обезличенные данные Пользователей, собираемые с&nbsp;помощью сервисов интернет-статистики, служат
        для сбора информации о&nbsp;действиях Пользователей на&nbsp;сайте, улучшения качества сайта и&nbsp;его
        содержания.</p>

      <h2 class="privacy-main__li">5.&nbsp;Правовые основания обработки персональных данных</h2>
      <p>5.1.&nbsp;Оператор обрабатывает персональные данные Пользователя только в&nbsp;случае их&nbsp;заполнения и/или
        отправки Пользователем самостоятельно через специальные формы, расположенные на&nbsp;сайте <a href="/">http://kdm1.ru</a>. Заполняя соответствующие формы и/или отправляя свои персональные данные
        Оператору, Пользователь выражает свое согласие с&nbsp;данной Политикой.</p>
      <p>5.2.&nbsp;Оператор обрабатывает обезличенные данные о&nbsp;Пользователе в&nbsp;случае, если это разрешено
        в&nbsp;настройках браузера Пользователя (включено сохранение файлов «cookie»
        и&nbsp;использование технологии JavaScript).</p>

      <h2 class="privacy-main__li">6.&nbsp;Порядок сбора, хранения, передачи и&nbsp;других видов обработки персональных
        данных</h2>
      <p>Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации
        правовых, организационных и&nbsp;технических мер, необходимых для выполнения в&nbsp;полном объеме
        требований действующего законодательства в&nbsp;области защиты персональных данных.</p>
      <p>6.1.&nbsp;Оператор обеспечивает сохранность персональных данных и&nbsp;принимает все возможные меры,
        исключающие доступ к&nbsp;персональным данным неуполномоченных лиц.</p>
      <p>6.2.&nbsp;Персональные данные Пользователя никогда, ни&nbsp;при каких условиях не&nbsp;будут переданы третьим
        лицам, за&nbsp;исключением случаев, связанных с&nbsp;исполнением действующего законодательства.</p>
      <p>6.3.&nbsp;В&nbsp;случае выявления неточностей в&nbsp;персональных данных, Пользователь может актуализировать
        их&nbsp;самостоятельно, путем направления Оператору уведомление на&nbsp;адрес электронной почты
        Оператора <a href="mailto:hello@kdm1.ru">hello@kdm1.ru</a> с&nbsp;пометкой «Актуализация
        персональных данных».</p>
      <p>6.4.&nbsp;Срок обработки персональных данных является неограниченным. Пользователь может в&nbsp;любой момент
        отозвать свое согласие на&nbsp;обработку персональных данных, направив Оператору уведомление посредством
        электронной почты на&nbsp;электронный адрес Оператора <a href="mailto:hello@kdm1.ru">hello@kdm1.ru</a>
        с&nbsp;пометкой «Отзыв согласия на&nbsp;обработку персональных данных».</p>

      <h2 class="privacy-main__li">7.&nbsp;Трансграничная передача персональных данных</h2>
      <p>7.1.&nbsp;Оператор до&nbsp;начала осуществления трансграничной передачи персональных данных обязан убедиться
        в&nbsp;том, что иностранным государством, на&nbsp;территорию которого предполагается осуществлять
        передачу персональных данных, обеспечивается надежная защита прав субъектов персональных данных.</p>
      <p>7.2.&nbsp;Трансграничная передача персональных данных на&nbsp;территории иностранных государств,
        не&nbsp;отвечающих вышеуказанным требованиям, может осуществляться только в&nbsp;случае наличия согласия
        в&nbsp;письменной форме субъекта персональных данных на&nbsp;трансграничную передачу его персональных
        данных и/или исполнения договора, стороной которого является субъект персональных данных.</p>

      <h2 class="privacy-main__li">8.&nbsp;Заключительные положения</h2>
      <p>8.1.&nbsp;Пользователь может получить любые разъяснения по&nbsp;интересующим вопросам, касающимся обработки
        его персональных данных, обратившись к&nbsp;Оператору с&nbsp;помощью электронной почты <a href="mailto:hello@kdm1.ru">hello@kdm1.ru</a>.</p>
      <p>8.2.&nbsp;В&nbsp;данном документе будут отражены любые изменения политики обработки персональных данных
        Оператором. Политика действует бессрочно до&nbsp;замены ее&nbsp;новой версией.</p>
      <p>8.3.&nbsp;Актуальная версия Политики в&nbsp;свободном доступе расположена в&nbsp;сети Интернет по&nbsp;адресу
        <a href="/privacy/">https://kdm1.ru/privacy/</a>.</p>
    </div>
  </Dialog>
</template>

<script>

import axios from "axios";
import "primeicons/primeicons.css";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

import authHeader from "@/services/auth-header";


export default {
  name: "Rate",
  components: {
    Dialog,
    Button,
    Dropdown,
    InputNumber,
    InputText
  },
  data() {

    return{
      displayPolit:false,
      displayConfirmation: false,
      selectRates:{},
      rates:[],
      loading:true,
      changeTarifId:null,
      displayPay:false,
      paySys:1,
      showSys:1,


      //юр лицо

      inn:null,
      showInnError:false,
      textInnError:null,

      kpp:null,
      showKppError:false,
      textKppError:null,

      ogrn:null,
      showOgrnError:false,
      textOgrnError:null,

      name_organiz:null,
      showNameOrganizError:false,
      textNameOrganizError:null,

      ur_addres:null,
      showUrAdressError:false,
      textUrAdressError:null,

      mail_addres:null,
      showMailAdressError:false,
      textMailAdressError:null,

      contact:null,
      showContactError:false,
      textContactError:null,

      contact_email:null,
      showContactEmailError:false,
      textContactEmailError:null,

      contact_phone:null,
      showContactPhoneError:false,
      textContactPhoneError:null,

      select_pick_up_documents: [
        {name: 'Системой ЭДО', code: 'edo'},
        {name: 'Курьер', code: 'courier'},
        {name: 'Почтой', code: 'mail'},
      ],
      pick_up_documents:null,
      name_edo:null,

      bank_name:null,
      showNameBankError:false,
      textNameBankError:null,


      bank_bik:null,
      showBankBikError:false,
      textBankBikError:null,

      bank_rs:null,
      showBankRsError:false,
      textBankRsError:null,

      bank_ks:null,
      showBankKsError:false,
      textBankKsError:null,


      bank_mail:null,
      showBankMailError:false,
      textBankMailError:null,

      bank_phone:null,
      showBankPhoneError:false,
      textBankPhoneError:null


    }
  },
  watch:{

  },
  methods: {
    sendForm(){
      if(this.paySys === 1){

        let error=0;

        this.showInnError = false;
        if(this.inn !== null){

          if(this.inn.length < 10){
            error++;
            this.showInnError = true;
            this.textInnError='Инн не может быть меньше 10';
          }
        } else {
          error++;
          this.showInnError = true;
          this.textInnError='Инн не может быть пустым';
        }

        this.showKppError = false;
        if(this.kpp !== null){
          if(this.kpp.toString().length < 9){
            error++;
            this.showKppError = true;
            this.textKppError='КПП не может быть меньше 9';
          }
        } else {
          error++;
          this.showKppError = true;
          this.textKppError='КПП не может быть пустым';
        }


        this.showOgrnError = false;
        if(this.ogrn !== null){
          if(this.ogrn.toString().length < 13){
            error++;
            this.showOgrnError = true;
            this.textOgrnError='ОГРН не может быть меньше 13';
          }
        } else {
          error++;
          this.showOgrnError = true;
          this.textOgrnError='ОГРН не может быть пустым';
        }

        this.showNameOrganizError = false;
        if(this.name_organiz !== null){
          if(this.name_organiz.length < 3){
            error++;
            this.showNameOrganizError = true;
            this.textNameOrganizError='Слишком короткое название';
          }
        } else {
          error++;
          this.showNameOrganizError = true;
          this.textNameOrganizError='Название не может быть пустым';
        }


        this.showUrAdressError = false;
        if(this.ur_addres !== null){
          if(this.ur_addres.length < 3){
            error++;
            this.showUrAdressError = true;
            this.textUrAdressError='Слишком короткий адрес';
          }
        } else {
          error++;
          this.showUrAdressError = true;
          this.textUrAdressError='Адрес не может быть пустым';
        }


        this.showMailAdressError = false;
        if(this.mail_addres !== null){
          if(this.mail_addres.length < 3){
            error++;
            this.showMailAdressError = true;
            this.textMailAdressError='Слишком короткий адрес';
          }
        } else {
          error++;
          this.showMailAdressError = true;
          this.textMailAdressError='Адрес не может быть пустым';
        }



        this.showContactError = false;
        if(this.contact === null){
          error++;
          this.showContactError = true;
          this.textContactError='Контакт не может быть пустым';
        }


        this.showContactEmailError = false;
        if (!this.contact_email) {
          error++;
          this.showContactEmailError = true;
          this.textContactEmailError='Почта не может быть пустой';
        } else {
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (!regex.test(this.contact_email)) {
            this.showContactEmailError=true;
            error++;
            this.textContactEmailError = 'Не является email';
          } else {
            let myarr = this.contact_email.split("@");
            if(myarr[0].length > 128 ||  myarr[1].length > 128){
              this.showContactEmailError=true;
              error++;
              this.textContactEmailError = 'Недопустимый формат email';
            } else {
              let firstPos = myarr[0].indexOf('.');
              if(firstPos !== -1){
                this.showContactEmailError=true;
                error++;
                this.textContactEmailError = 'email не может начинатся с "."';
              }
            }
          }
        }

        this.showContactPhoneError = false;
        if(this.contact_phone !== null){
          if(this.contact_phone.toString().length < 5){
            error++;
            this.showContactPhoneError = true;
            this.textContactPhoneError='Слишком короткий номер';
          }
        } else {
          error++;
          this.showContactPhoneError = true;
          this.textContactPhoneError='Телефон не может быть пустым';
        }

        this.showNameBankError = false;
        if(this.bank_name !== null){
          if(this.bank_name.length < 3){
            error++;
            this.showNameBankError = true;
            this.textNameBankError='Слишком короткое наименования банка';
          }
        } else {
          error++;
          this.showNameBankError = true;
          this.textNameBankError='Поле не может быть пустым';
        }

        this.showBankBikError = false;
        if(this.bank_bik !== null){
          if(this.bank_bik.toString().length < 8){
            error++;
            this.showBankBikError = true;
            this.textBankBikError='Бик не может быть меньше 9';
          }
        } else {
          error++;
          this.showBankBikError = true;
          this.textBankBikError='Бик не может быть пустым';
        }

        this.showBankRsError = false;
        if(this.bank_rs !== null){
          if(this.bank_rs.toString().length < 20){
            error++;
            this.showBankRsError = true;
            this.textBankRsError='Р/С не может быть меньше 20';
          }
        } else {
          error++;
          this.showBankRsError = true;
          this.textBankRsError='Р/С не может быть пустым';
        }

        this.showBankKsError = false;
        if(this.bank_ks !== null){
          if(this.bank_ks.toString().length < 20){
            error++;
            this.showBankKsError = true;
            this.textBankKsError='К/С не может быть меньше 20';
          }
        } else {
          error++;
          this.showBankKsError = true;
          this.textBankKsError='К/С не может быть пустым';
        }


        this.showBankMailError = false;
        if (!this.bank_mail) {
          error++;
          this.showBankMailError = true;
          this.textBankMailError='Почта не может быть пустой';
        } else {
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (!regex.test(this.bank_mail)) {
            this.showBankMailError=true;
            error++;
            this.textBankMailError = 'Не является email';
          } else {
            let myarr = this.bank_mail.split("@");
            if(myarr[0].length > 128 ||  myarr[1].length > 128){
              this.showBankMailError=true;
              error++;
              this.textBankMailError = 'Недопустимый формат email';
            } else {
              let firstPos = myarr[0].indexOf('.');
              if(firstPos !== -1){
                this.showBankMailError=true;
                error++;
                this.textBankMailError = 'email не может начинатся с "."';
              }
            }
          }
        }

        this.showBankPhoneError = false;
        if(this.bank_phone !== null){
          if(this.bank_phone.toString().length < 5){
            error++;
            this.showBankPhoneError = true;
            this.textBankPhoneError='Слишком короткий номер';
          }
        } else {
          error++;
          this.showBankPhoneError = true;
          this.textBankPhoneError='Телефон не может быть пустым';
        }




        if(error ===0 ){
          console.log('отправляем');
          let data ={
              paySys:this.paySys,
              inn:this.inn,
              kpp:this.kpp,
              ogrn:this.ogrn,
              name_organiz:this.name_organiz,
              ur_addres:this.ur_addres,
              mail_addres:this.mail_addres,
              contact:this.contact,
              contact_email:this.contact_email,
              contact_phone:this.contact_phone,
              pick_up_documents:this.pick_up_documents,
              name_edo:this.name_edo,
              bank_name:this.bank_name,
              bank_bik:this.bank_bik,
              bank_rs:this.bank_rs,
              bank_ks:this.bank_ks,
              bank_mail:this.bank_mail,
              bank_phone:this.bank_phone
          }

          axios.post( 'http://panel.kdm1.biz/api/ratesrequisites/add',
              data,
              {
                headers: authHeader()
                //headers: { authHeader(), 'Content-Type': 'multipart/form-data'}
              }
          ).then((resp) => {
            if(resp.data === 'saccess'){

              this.$toast.add({severity:'success', summary: 'Задача добавлена', detail:'', life: 3000});


            } else {
              this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Попробуйте позже', life: 3000});
            }


          }).catch(function(error){
            console.log(error);
            console.log(this.$toast);
            this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено название задачи', life: 3000});
          });

        }

/*            inn:null,
            kpp:null,
            ogrn:null,
            name_organiz:null,
            ur_addres:null,
            mail_addres:null,
            contact:null,
            contact_email:null,
            contact_phone:null,
            pick_up_documents:null,
            name_edo:null,
            bank_name:null,
            bank_bik:null,
            bank_rs:null,
            bank_ks:null,
            bank_mail:null,
            bank_phone:null,
  */
      }
    },
    showPaySys(id){
      this.showSys = id;
    },
    openPay(){
      this.displayPay=true;
    },
    closeModal(){
      this.displayPay=false;
    },
    openConfirmation(id) {
      this.displayConfirmation = true;
      this.changeTarifId=id;
    },
    closeConfirmation(){
      this.displayConfirmation = false;
    },
    changeTarif(){
      this.loading = true;
      axios.post( 'http://panel.kdm1.biz/api/rates/change',
          {rate:this.changeTarifId},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        if(resp.data === 'success'){
          this.initRates();
          this.changeTarifId=null;
        }
        this.displayConfirmation = false;
      }).catch(function(error){
        this.loading = false;
        console.log(error);
      });
    },
    async initRates(){
      axios.post( 'http://panel.kdm1.biz/api/rates/list',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        let tmprates = resp.data;

        let k=0;
        for (let i in tmprates){
          if(tmprates[i].selected){
            this.selectRates = tmprates[i];
            this.selectRates={
              'id':tmprates[i].id,
              'name':tmprates[i].name,
              'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
              'props':JSON.parse(tmprates[i].props),
            }
          } else {

            this.rates[k]={
              'id':tmprates[i].id,
              'name':tmprates[i].name,
              'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
              'props':JSON.parse(tmprates[i].props),
              'sort':tmprates[i].sort,
            }
            k++;
          }

        }


        setTimeout(()=>{
          this.loading = false
        },1000);

      }).catch(function(error){
        console.log(error);
      });
    },
    async initRatesrequisites(){
      axios.post( 'http://panel.kdm1.biz/api/ratesrequisites/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{

       console.log(resp.data);

        this.inn=resp.data[0].inn;
        this.kpp=resp.data[0].kpp;
        this.ogrn=resp.data[0].ogrn;
        this.name_organiz=resp.data[0].name_organiz;
        this.ur_addres=resp.data[0].ur_addres;
        this.mail_addres=resp.data[0].mail_addres;
        this.contact=resp.data[0].contact;
        this.contact_email=resp.data[0].contact_email;
        this.contact_phone=resp.data[0].contact_phone;
        this.pick_up_documents=resp.data[0].pick_up_documents;
        this.name_edo=resp.data[0].name_edo;
        this.bank_name=resp.data[0].bank_name;
        this.bank_bik=resp.data[0].bank_bik;
        this.bank_rs=resp.data[0].bank_rs;
        this.bank_ks=resp.data[0].bank_ks;
        this.bank_mail=resp.data[0].bank_mail;
        this.bank_phone=resp.data[0].bank_phone;


      }).catch(function(error){
        console.log(error);
      });
    }
  },
  mounted() {
    this.initRates();
    this.initRatesrequisites();
    //console.log(this.$store.state.auth.user.manager);
  },
};
</script>
<style>
.form-group{
  margin-bottom: 1rem;
}
</style>