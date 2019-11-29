import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger,
    // ...
  } from '@angular/animations';


  export const showAnimation = trigger('showAnimation', [
    state('open', style({opacity: 1})),
    state('close', style({opacity: 0})),
    transition('close => open', animate('.5s'))
  ])

  export const listAnimation = trigger('listAnimation', [
    transition('* <=> *', [
        query(':enter', [style({opacity: 0})], { optional: true }),
        query(':enter', stagger('.3s', [animate('.5s', style({opacity: 1}))] ), { optional: true }),
        query(':leave', stagger('.3s', [animate('.5s', style({opacity: 0}))] ), { optional: true })
    ])
  ])

  export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
    transition(':enter', [
        style({opacity: 0}),
        animate('.2s', style({opacity: 1}))
    ]),
    
    transition(':leave', [
      style({opacity: 1}),
      animate('.2s', style({opacity: 0}))
    ])
  ])


  export const strechAnimation = trigger('strechAnimation', [
    state('true', style({width: '66.67%'})),
    state('false', style({width: '100%'})),
    transition('true <=> false', animate('.3s'))   
  ])