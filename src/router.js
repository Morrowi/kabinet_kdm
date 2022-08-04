import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Recovery from "./components/Recovery.vue";

import Register from "./components/Register.vue";
import PageNotFound from "./views/PageNotFound.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta:{
      title: 'Добрый маркетолог — личный кабинет',
      description: 'Добрый маркетолог — личный кабинет',
    }
  },
  {
    path: "/dashboard",
    component: BoardUser,
    children: [
      {
        path: '',
        component: () => import('./views/user/Index.vue'),
      },
      {
        path: 'marketer',
        component: () => import('./views/user/Marketer.vue'),
      },
      {
        path: 'tasks',
        component: () => import('./views/user/Tasks.vue'),
      },
      {
        path: 'reports',
        component: () => import('./views/user/Reports.vue'),
      },
      {
        path: 'inpayac',
        component: () => import('./views/user/Inpayac.vue'),
      },
      {
        path: 'notifications',
        component: () => import('./views/user/Notifications.vue'),
      },
      {
        path: 'rate',
        component: () => import('./views/user/Rate.vue'),
      },
      {
        path: 'profile',
        component: () => import('./views/user/Profile.vue'),
      },
      {
        path: 'support',
        component: () => import('./views/user/support/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('./views/user/support/Support.vue'),
          },
          {
            path: ':id',
            component: () => import('./views/user/support/Ticket.vue'),
          },
          {
            path: 'request',
            component: () => import('./views/user/support/Request.vue'),
          }
        ]
      },

    ],
    meta:{
      title: 'Добрый маркетолог — личный кабинет'
    }
  },
  {
    path: "/login",
    component: Login,
    meta:{
      title: 'Авторзация'
    }
  },
  {
    path: "/register",
    component: Register,
    meta:{
      title: 'Регистрация'
    }
  },
  {
    path: "/recovery",
    component: Recovery,
    name: 'Recovery',
    meta:{
      title: 'Добрый маркетолог — восстановление пароля'
    }
  },
  {
    path: "/recovery/:id",
    name: 'Recovery id',
    component: Recovery,
    meta:{
      title: 'Добрый маркетолог — восстановление пароля'
    }
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
    meta:{
      title: 'Профиль'
    }
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
    children: [
      {path: '',
        component: () => import('./views/admin/Index.vue'),
      },
      {
        path: 'users',
        component: () => import('./views/admin/Users.vue'),
      },
      {
        path: 'users/add',
        component: () => import('./views/admin/AddUsers.vue')
      },
      {
        path: 'noty',
        component: () => import('./views/admin/noty.vue')
      },
      {
        path: 'support',
        name: "Support",
        component: () => import('./views/admin/support/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('./views/admin/support/Support.vue'),
          },
          {
            path: ':id',
            component: () => import('./views/admin/support/Ticket.vue'),
          }
        ]
      },
      {
        path: 'mail',
        component: () => import('./views/admin/mail/index.vue'),
        children: [
          {
            path: '',
            component: () => import('./views/admin/mail/setting.vue')
          },
          {
            path: 'type',
            component: () => import('./views/admin/mail/type.vue')
          },
          {
            path: 'list',
            component: () => import('./views/admin/mail/MailList.vue')
          },
          {
            path: 'add',
            component: () => import('./views/admin/mail/add.vue')
          },
        ]
      },

      {
        path: 'reviews',
        component: () => import('./views/admin/Reviews.vue'),
      },
      {
        path: 'profile',
        component: Profile
      }
    ],
    meta:{
      title: 'Панель администратора'
    }
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
    children: [
      {path: '',
        component: () => import('./views/mod/Index.vue'),
      },
      {
        path: 'tasks',
        component: () => import('./views/mod/Tasks.vue'),
      },
      {
        path: 'reports',
        component: () => import('./views/mod/Reports.vue')
      },
      {
        path: 'profile',
        component: () => import('./views/mod/Profile.vue')
      },
      {
        path: 'chat',
        component: () => import('./views/mod/Chat.vue')
      },
    ],
    meta:{
      title: 'Панель маркетолога'
    }
  },
  /*{
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },*/
  // {
  //   path: "*",
  //   component: PageNotFound
  // },
  {
    path: '/:pathMatch(.*)',
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register', '/home', '/recovery','/recovery/'];
  //http://localhost:8080/recovery/6d167789a82410d87e6fa5b19585d844037823b5

   to.path = to.path.replace(to.params.id,'');
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  document.title = to.meta.title;
  document.description = to.meta.description;

  let btnShowMenu = document.getElementById("btn-showMenu");
  if(btnShowMenu !== null){
    let jsMobMenuWrap = document.getElementById("js__mobMenuWrap");
    jsMobMenuWrap.classList.remove("active");
    btnShowMenu.classList.remove("active");
  }
  console.log(btnShowMenu);
  //
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;