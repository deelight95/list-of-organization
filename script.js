// Запуск модального окна
$(document).ready(function(){
    $('.openwnd').click(function(){
        $('.poup').fadeIn();
    });
    $('.poup .close').click(function(){
        $('.poup').fadeOut();
    });
});

// Создаем новую строку в таблице 
Vue.component('todo-item', {
  template: '\
    <tr>\
      <td>{{ title }}</td>\
      <td contenteditable="true">{{ title2 }}</td>\
      <td>{{ title3 }}</td>\
      <td>{{ title4 }}</td>\
      <td>{{ title5 }}</td>\
      <td><button class="btn-delete" v-on:click="$emit(\'remove\')">Удалить</button></td>\
    </tr>\
  ',
  props: ['title','title2','title3','title4','title5']
});

// Принимаем введенные в input значения и методом addNewTodo добавляем в таблицу
var app = new Vue({
  el: '#todo-list-example',
  data: {
    nameOrganization: '',
    addressOrganization: '',
    ogrnOrganization: '',
    innOrganization: '',
    dateRegistration: '',
    todos: [
      {
        id: 1,
        title: 'ПАО Сбербанк',
        title2: 'ул.Гоголя 44',
        title3: '1027700132195',
        title4: '7707083893',
        title5: '20.06.1991'
      },
      {
        id: 2,
        title: 'ООО "АНАНАС. ИТ РЕШЕНИЯ"',
        title2: 'г Екатеринбург, ул Чайковского, д 62, кв 52',
        title3: '1169658085684',
        title4: '6679096487',
        title5: '27.07.2016'
      },
    ],
    nextTodoId: 3
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.nameOrganization,
        title2: this.addressOrganization,
        title3: this.ogrnOrganization,
        title4: this.innOrganization,
        title5: this.dateRegistration
      })
      this.newTodoText = ''
    }
  }
});

// Добавляем возможность при вводе ИНН (или наименования) получать список подходящих компаний с dadata.ru, а также все данные компаний
var abc = $("#inn").suggestions({
    token: "885e5f2b79daf9d5abaafcc802ac93d1908a053b",
    type: "PARTY",
    onSelect: function(suggestion) {
        var nameOrg = suggestion.value;
        var ticks = suggestion.data.state.registration_date;
        var date = new Date(ticks);
        var month = date.getMonth()+1;
        function pad(n, width, z) {
          z = z || '0';
          n = n + '';
          return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };
        month = pad(month,2);
        var date = date.getDate() + '.' + month + '.' + date.getFullYear();
        app.innOrganization = suggestion.data.inn;
    }
}).suggestions();

// При нажатии на "Применить" около ИНН, вставляет во все input значения с dadata.ru
function complete(abc) {
    app.nameOrganization = abc.selection.value;
    app.addressOrganization = abc.selection.data.address.value;
    app.ogrnOrganization = abc.selection.data.ogrn;
    app.innOrganization = abc.selection.data.inn;
    var ticks = abc.selection.data.state.registration_date;
    var date = new Date(ticks);
    var month = date.getMonth()+1;
    var day = date.getDate();
    function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    month = pad(month, 2);
    day = pad(day, 2);
    var date = day + '.' + month + '.' + date.getFullYear();
    app.dateRegistration = date;    
};

