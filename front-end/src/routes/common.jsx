import Dashboard from '../pages/Dashboard/Dashboard';
import CommunityDetails from '../pages/Community/CommunityDetails';
import CommunityForm from '../pages/Community/CommunityForm';
import CommunityListAll from '../pages/Community/CommunityListAll';
import ThreadForm from '../pages/Community/ThreadForm';
import ThreadDetails from '../pages/Community/ThreadDetails';
import PostForm from '../pages/Community/PostForm';
// import PostForm from '../pages/Community/PostForm';

/**
 * Define routes and sidebar links at the same time.
 * Note that only items with 'icon' property and
 * without 'redirect' property will be rendered on sidebar.
 * @type {Object[]}
 */
const commonRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    authRequired: true,
  },
  {
    path: '/community/create',
    name: 'community.form',
    component: CommunityForm,
    authRequired: true,
  },
  {
    path: '/community/:id/update',
    name: 'community.form',
    component: CommunityForm,
    authRequired: true,
  },
  {
    path: '/community/:communityId/thread/create',
    name: 'community.thread.create',
    component: ThreadForm,
    authRequired: true,
  },
  {
    path: '/community/:communityId/thread/:id/update',
    name: 'community.thread.update',
    component: ThreadForm,
    authRequired: true,
  },
  {
    path: '/community/:communityId/thread/:threadId/post/create',
    name: 'community.thread.post.create',
    component: PostForm,
    authRequired: true,
  },
  {
    path: '/community/:communityId/thread/:threadId/post/:id/update',
    name: 'community.thread.post.create',
    component: PostForm,
    authRequired: true,
  },
  {
    path: '/community/:communityId/thread/:id',
    name: 'community.thread.details',
    component: ThreadDetails,
    authRequired: true,
  },
  {
    path: '/community/:id',
    name: 'community.details',
    component: CommunityDetails,
    authRequired: true,
  },
  {
    path: '/communities',
    name: 'community.listAll',
    component: CommunityListAll,
    authRequired: true,
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    name: 'menu.dashboard.redirect',
  },
];

export default commonRoutes;
