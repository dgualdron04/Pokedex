export default {
    name: 'pokedex',
    component: () => import(/* webpackChunkName: "Pokedex-Layout" */ '@/modules/pokedex/layouts/PokedexLayout.vue'),
    children: [
        {
            path: '',
            name: 'pokedex.welcome',
            component: () => import(/* webpackChunkName: "Welcome" */ '@/modules/pokedex/views/Welcome.vue'),
        },
        {
            path: 'list',
            name: 'pokedex.list',
            component: () => import(/* webpackChunkName: "List" */ '@/modules/pokedex/views/List.vue')
        }
    ]
}