import { createRouter, createWebHistory } from 'vue-router'
import TableauDuBoard from '../views/TableauDeBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TableauDuBoard
    },
    {
      path: '/stagiaire',
      name: 'stagiaire',
      component: () => import('../views/StagiaireView.vue')
    }, {
      path: '/professeur',
      name: 'professeur',
      component: () => import('../views/ProfesseurView.vue')
    }, {
      path: '/matiere',
      name: 'matiere',
      component: () => import('../views/MatiereView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/etablissement',
      name: 'etablissement',
      component: () => import('../views/EtablissementView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'regsiter',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/routeNotFound.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  // essayer d'accéder à une page restreinte + pas connecté
  // rediriger vers la page de connexion
  if (authRequired && !loggedIn && to.name !== "notFound") {
    next('/login');
  } else {
    next();
  }
})

export default router
