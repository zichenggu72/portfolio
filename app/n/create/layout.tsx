'use client';
import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';


type Pin = {
  id: string;
  latitude: number;
  longitude: number;
  images: {
    url: string;
    alt?: string;
    orientation: 'horizontal' | 'vertical';
    caption?: string;
  }[];
  title: string;
}

const initialPins: Pin[] = [
  {
    id: '1',
    latitude: 47.6062,
    longitude: -122.3321,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736939524/DSC09616_ys36ja.jpg',
        alt: 'Seattle scene 1',
        orientation: 'vertical',
        caption: 'Mountain Rainier'
       
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736940643/IMG_4063_t92947.jpg',
        alt: 'Seattle scene 2',
        orientation: 'vertical',
        caption: 'Hand picked fruits'
     
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736939524/IMG_2117_cldjwc.jpg',
        alt: 'Seattle scene 3',
        orientation: 'horizontal',
        caption: 'The oil painting-like sunset'
       
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736939524/IMG_2773_imrnes.jpg',
        alt: 'Seattle scene 1',
        orientation: 'horizontal',
        caption: 'South Lake Union'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736940819/IMG_5435_vn8pq2.jpg',
        alt: 'Seattle scene 1',
        orientation: 'horizontal',
        caption: 'Hello'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736940644/DSC05517_vpgvks.jpg',
        alt: 'Seattle scene 1',
        orientation: 'horizontal',
        caption: 'Kerry Park'
      },

    ], // Add image URLs for Seattle
    title: 'Seattle'
  },
  {
    id: '2',
    latitude: 51.5074,
    longitude: -0.1278,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034358/DSC00587_y04x96.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Christmas vibe with a peanut vendor'
       
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034415/DSC00427-2_rvbix4.jpg',
        alt: 'London scene 2',
        orientation: 'horizontal',
        caption: 'A pub at a rainy night'
     
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034383/DSC00472_bmbbd2.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'Regent St during Christmas'
       
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448815/DSC09217_cl0udi.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'The Cosmic House by Charles Jencks'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448701/DSC09216_qidn0m.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'A leaf'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448917/DSC08934-2_joik0b.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'Gagosian Gallery'
      },      
        {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736449025/DSC08064_dtyiyv.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'View of the Isle of Dogs'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736870497/DSC08926-2_c33gze.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Mount St'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736870498/DSC08916-2_uihvcd.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'The reflection'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736872999/DSC08900-2_rbfgao.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Sky Garden'
      },

    ],
    title: 'London'
  },
  {
    id: '3',
    latitude: 41.0082,
    longitude: 28.9784,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736938015/DSC09910_likjzo.jpg',
        alt: 'Turkey scene 1',
        orientation: 'vertical',
        caption: 'Cat and statue'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736453522/DSC00199-2_zrmdit.jpg',
        alt: 'Turkey scene 2',
        orientation: 'vertical',
        caption: 'Hey fish, dinner served'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448471/DSC09659-2_jxnkhg.jpg',
        alt: 'Turkey scene 2',
        orientation: 'horizontal',
        caption: 'A determined turkish man'
        
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736938019/DSC09649_x3y8oh.jpg',
        alt: 'Turkey scene 4',
        orientation: 'horizontal',
        caption: 'Afternoon tea'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736937557/DSC00172_s7fwpl.jpg',
        alt: 'Turkey scene 4',
        orientation: 'horizontal',
        caption: 'Kas'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1735939400/DSC09764-2_nnm85n.jpg',
        alt: 'Turkey scene 3',
        orientation: 'horizontal',
        caption: 'Corncob vendor by the sea'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736937104/DSC00308_copy_o4dwve.jpg',
        alt: 'Turkey scene 4',
        orientation: 'horizontal',
        caption: 'Thousands of years ago'
      }

    ],
    title: 'Turkey'
  },
  {
    id: '4',
    latitude: 35.6762,
    longitude: 139.6503,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999863/DSC07563_nlh5hf.jpg',
        alt: 'Japan scene 1',
        orientation: 'vertical',
        caption: 'Street view from Shibuya Sky'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999862/DSC06824_u4jfa3.jpg',
        alt: 'Japan scene 2',
        orientation: 'vertical',
        caption: 'Ninenzaka'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999871/DSC05818_mdx3xe.jpg',
        alt: 'Japan scene 3',
        orientation: 'horizontal',
        caption: 'Osaka Umeda'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999864/DSC06903_hybwph.jpg',
        alt: 'Japan scene 4',
        orientation: 'horizontal',
        caption: 'Street view that gives me the Japan vibe'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999866/DSC06929_luvx8n.jpg',
        alt: 'Japan scene 5',
        orientation: 'horizontal',
        caption: 'Kamo River'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999865/DSC06998_k7rsoa.jpg',
        alt: 'Japan scene 6',
        orientation: 'horizontal',
        caption: 'Lake Kawaguchi'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999865/DSC06949_h5ysyu.jpg',
        alt: 'Japan scene 7',
        orientation: 'horizontal',
        caption: 'Village around Mount Fuji'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000077/f0c10ad49a8cfe63abee18e441c0fdde_y7ulir.jpg',
        alt: 'Japan scene 8',
        orientation: 'horizontal',
        caption: 'Artpiece manhole cover'
      },

      
    ],
    title: 'Japan'
  },
  {
    id: '5',
    latitude: 45.5017,
    longitude: -73.5673,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000576/DSC08437_b6ndqo.jpg',
        alt: 'Montreal scene 1',
        orientation: 'vertical',
        caption: 'Chic street view'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000575/DSC08809_qjhnfn.jpg',
        alt: 'Montreal scene 2',
        orientation: 'vertical',
        caption: 'Just like the town in fairy tale'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000575/DSC08795_jdfw7p.jpg',
        alt: 'Montreal scene 3',
        orientation: 'horizontal',
        caption: 'The autumn vibe'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000575/DSC08876_ltem9j.jpg',
        alt: 'Montreal scene 4',
        orientation: 'horizontal',
        caption: 'The picturistic Fairmont Le Château Frontenac'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000574/DSC08523_ng5vas.jpg',
        alt: 'Montreal scene 5',
        orientation: 'horizontal',
        caption: 'Notre-Dame Basilica of Montreal'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737000573/DSC08582_lovicm.jpg',
        alt: 'Montreal scene 6',
        orientation: 'horizontal',
        caption: 'Nature Lover'
      },
      
    ],
    title: 'Montreal & Quebec City'
  },
  {
    id: '6',
    latitude: 29.2920,
    longitude: 117.2074,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736998904/DSC05498_g3l7t9.jpg',
        alt: 'Jingdezhen scene 1',
        orientation: 'vertical',
        caption: 'Porcelain bowl in making'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999078/DSC05727_yvc5yp.jpg',
        alt: 'Jingdezhen scene 2',
        orientation: 'vertical',
        caption: 'Imperial Porcelain'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999080/DSC05571_my4cxr.jpg',
        alt: 'Jingdezhen scene 3',
        orientation: 'vertical',
        caption: 'Porcelain Palace with porcelain floor'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999076/DSC05749_kzciyu.jpg',
        alt: 'Jingdezhen scene 4',
        orientation: 'vertical',
        caption: 'O-lo-lo-lo'
      },     
       {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736999076/DSC05733_zppg8g.jpg',
        alt: 'Jingdezhen scene 5',
        orientation: 'horizontal',
        caption: 'Imperial Porcelain'
      },      
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736998907/DSC05495_xy9ygf.jpg',
        alt: 'Jingdezhen scene 6',
        orientation: 'horizontal',
        caption: 'The art of repeating'
      },      
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736998908/DSC05444_ppdczs.jpg',
        alt: 'Jingdezhen scene 7',
        orientation: 'horizontal',
        caption: 'The art of broken'
      },
      
    ],
    title: 'Jingdezhen'
  },
  {
    id: '7',
    latitude: 41.8781,
    longitude: -87.6298,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737454488/DSC00266_n5jhol.jpg',
        alt: 'Chicago scene 1',
        orientation: 'vertical',
        caption: 'The architectural city'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737454481/IMG_0459_qsdlhw.jpg',
        alt: 'Chicago scene 2',
        orientation: 'vertical',
        caption: 'The architectural city'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737454472/IMG_0457_jlxd7o.jpg',
        alt: 'Chicago scene 3',
        orientation: 'vertical',
        caption: 'The green line'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737454480/DSC00294_lrlw97.jpg',
        alt: 'Chicago scene 4',
        orientation: 'vertical',
        caption: 'Believe'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737454482/DSC00336_mbo8kt.jpg',
        alt: 'Chicago scene 5',
        orientation: 'horizontal',
        caption: 'The Chicago Theatre'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737454477/DSC00445_cedqwa.jpg',
        alt: 'Chicago scene 6',
        orientation: 'horizontal',
        caption: 'That kind of snow, and winter'
      },
      
    ],
    title: 'Chicago'
  },
  {
    id: '8',
    latitude: 19.8968,
    longitude: -155.5828,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455317/DSC06552_evsfa1.jpg',
        alt: 'Hawaii scene 1',
        orientation: 'horizontal',
        caption: 'The lighthouse'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455313/Snapseed_pmvs17.jpg',
        alt: 'Hawaii scene 2',
        orientation: 'horizontal',
        caption: 'The fog floating'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455314/DSC07119_fk8tpz.jpg',
        alt: 'Hawaii scene 3',
        orientation: 'horizontal',
        caption: 'When I touch the light above the clouds'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455318/DSC06467_fowhph.jpg',
        alt: 'Hawaii scene 4',
        orientation: 'horizontal',
        caption: 'Starry night'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455323/DSC07100_escejz.jpg',
        alt: 'Hawaii scene 5',
        orientation: 'horizontal',
        caption: 'Lava by the sea, the big island'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455317/DSC06481_bbu76m.jpg',
        alt: 'Hawaii scene 6',
        orientation: 'horizontal',
        caption: 'The fruit vendor at local market'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455546/Snapseed_2_df6syr.jpg',
        alt: 'Hawaii scene 7',
        orientation: 'horizontal',
        caption: 'Lanikai Pillbox Trail'
      },
      
    ],
    title: 'Hawaii'
  },
  {
    id: '9',
    latitude: 61.2181,
    longitude: -149.9003,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455634/IMG_8934_oc0cgt.jpg',
        alt: 'Anchorage scene 1',
        orientation: 'vertical',
        caption: 'How far back in time am I staring at'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455616/IMG_8939_hi6aoe.jpg',
        alt: 'Anchorage scene 2',
        orientation: 'vertical',
        caption: 'The ice hole'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455623/7caba190de2ea79f510b85707521a53d_vi12c0.jpg',
        alt: 'Anchorage scene 3',
        orientation: 'horizontal',
        caption: 'Denali National Park'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455618/IMG_8196_wky0f4.jpg',
        alt: 'Anchorage scene 4',
        orientation: 'horizontal',
        caption: 'Denali National Park'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455618/e23c89970b49a4c7febe51e752f9bb8e_klapxo.jpg',
        alt: 'Anchorage scene 5',
        orientation: 'horizontal',
        caption: 'Denali National Park'
      },
     
    ],
    title: 'Anchorage'
  },
  {
    id: '10',
    latitude: 44.4280,
    longitude: -110.5885,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737456004/IMG_4678_m4s6lw.jpg',
        alt: 'Yellowstone scene 1',
        orientation: 'horizontal',
        caption: 'Live in the nature'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737456007/DSC08431_gm7aav.jpg',
        alt: 'Yellowstone scene 2',
        orientation: 'horizontal',
        caption: 'The color'
      },   {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737456004/IMG_4729_c34u6d.jpg',
        alt: 'Yellowstone scene 3',
        orientation: 'horizontal',
        caption: 'The color'
      },   {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737456011/DSC08580_kpb6bc.jpg',
        alt: 'Yellowstone scene 4',
        orientation: 'horizontal',
        caption: 'The hill and the spring'
      },   {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737456004/IMG_4739_ngbrwo.jpg',
        alt: 'Yellowstone scene 5',
        orientation: 'horizontal',
        caption: 'Residents in the park'
      },
    
    ],
    title: 'Yellowstone & Grand Teton'
  },
  {
    id: '11',
    latitude: 36.0544,
    longitude: -112.1401,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455622/DSC04860_cpqlwe.jpg',
        alt: 'Grand Canyon scene 1',
        orientation: 'vertical',
        caption: 'Arches National Park'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455635/DSC05901_z5o1nh.jpg',
        alt: 'Grand Canyon scene 2',
        orientation: 'vertical',
        caption: 'Grand Canyon National Park'
      },      
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455947/DSC04592_lam5t1.jpg',
        alt: 'Grand Canyon scene 3',
        orientation: 'horizontal',
        caption: 'Bryce Canyon National Park'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455634/DSC04708_jvctsl.jpg',
        alt: 'Grand Canyon scene 4',
        orientation: 'horizontal',
        caption: 'Bryce Canyon National Park'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455630/DSC05199_vdx7oc.jpg',
        alt: 'Grand Canyon scene 5',
        orientation: 'horizontal',
        caption: 'Monument Valley feat. Forrest Gump'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737455627/DSC05597_uk7epe.jpg',
        alt: 'Grand Canyon scene 6',
        orientation: 'horizontal',
        caption: 'Lake Powell'
      },
    ],
    title: 'Grand Canyon etc'
  },
  // {
  //   id: '12',
  //   latitude: 30.3935,
  //   longitude: -86.4958,
  //   images: [
  //     {
  //       url: 'path_to_montreal_image1',
  //       alt: 'Montreal scene 1',
  //       orientation: 'vertical',
  //       caption: 'Old Montreal'
  //     },
  //     // Add more Montreal images here
  //   ],
  //   title: 'Destin'
  // },
  // {
  //   id: '13',
  //   latitude: 40.7128,
  //   longitude: -74.0060,
  //   images: [
  //     {
  //       url: 'path_to_montreal_image1',
  //       alt: 'Montreal scene 1',
  //       orientation: 'vertical',
  //       caption: 'Old Montreal'
  //     },
  //     // Add more Montreal images here
  //   ],
  //   title: 'New York'
  // },  
  {
    id: '14',
    latitude: 50.8552,
    longitude: 0.5744,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737500437/DSC00666_hpf06f.jpg',
        alt: 'Hasting scene 1',
        orientation: 'vertical',
        caption: '@Soap And Salvation'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737457256/DSC00702_yp5acv.jpg',
        alt: 'Hasting scene 2',
        orientation: 'vertical',
        caption: 'Selfie by the East hill lift'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737457256/DSC00684_i6vlvl.jpg',
        alt: 'Hasting scene 3',
        orientation: 'horizontal',
        caption: 'a small English town'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737457256/DSC00671-2_lol76k.jpg',
        alt: 'Hasting scene 4',
        orientation: 'horizontal',
        caption: '@Merchant & Mills'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737457256/DSC00723_rzpqen.jpg',
        alt: 'Hasting scene 5',
        orientation: 'horizontal',
        caption: 'I can still remember the freezing weather'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737457255/DSC00680_b3tufa.jpg',
        alt: 'Hasting scene 6',
        orientation: 'horizontal',
        caption: 'Seagull'
      },
      // Add more Montreal images here
    ],
    title: 'Hastings & Rye'
  },
  
  
  {
    id: '15',
    latitude: 44.7866,
    longitude: 20.4489,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782036/DSCF7697_fhe31f.jpg',
        alt: 'Belgrade scene 1',
        orientation: 'vertical',
        caption: 'Laugh it out'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782036/DSCF7973_rxktyb.jpg',
        alt: 'Belgrade scene 2',
        orientation: 'vertical',
        caption: 'Lady in the flower'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782041/DSCF8062_oiazzq.jpg',
        alt: 'Belgrade scene 3',
        orientation: 'horizontal',
        caption: 'Belgrade street view'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782039/DSCF7998_sx3lt0.jpg',
        alt: 'Belgrade scene 4',
        orientation: 'horizontal',
        caption: 'Reimagining the grocery store'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782044/DSCF8240_uowqah.jpg',
        alt: 'Belgrade scene 5',
        orientation: 'horizontal',
        caption: 'Protesting people flush to the bridge'
      },
     
    ],
    title: 'Belgrade'
  },

  {
    id: '16',
    latitude: 41.3874,
    longitude: 2.1686,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782039/DSCF8464_igbxof.jpg',
        alt: 'Barcelona scene 1',
        orientation: 'vertical',
        caption: 'Couple by the shore'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782039/DSCF8445_i7yfos.jpg',
        alt: 'Barcelona scene 2',
        orientation: 'vertical',
        caption: 'Chilling'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782038/DSCF9565_li4ioz.jpg',
        alt: 'Barcelona scene 3',
        orientation: 'vertical',
        caption: 'A boy and pigeons'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782043/DSCF9366_lhre9o.jpg',
        alt: 'Barcelona scene 4',
        orientation: 'vertical',
        caption: '@Quimet & Quimet'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782038/DSCF9715_yieqfh.jpg',
        alt: 'Barcelona scene 5',
        orientation: 'vertical',
        caption: 'The forever Sagrada Família'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782043/DSCF9573_jf7r5b.jpg',
        alt: 'Barcelona scene 6',
        orientation: 'vertical',
        caption: 'Casa Vicens Gaudí'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747782036/DSCF9378_jfkidg.jpg',
        alt: 'Barcelona scene 7',
        orientation: 'horizontal',
        caption: 'Jamon is at the next level here'
      },
      
    ],
    title: 'Barcelona'
  },

  {
    id: '17',
    latitude: 46.6863,
    longitude: 7.8632,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783450/DSCF1303_y0ndlh.jpg',
        alt: 'Interlaken lake view',
        orientation: 'vertical',
        caption: 'Lake Brienz'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783450/DSCF1463_b6rizp.jpg',
        alt: 'Alpine stream',
        orientation: 'vertical',
        caption: 'Melting snow turns into blue streams'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783450/DSCF1279_rnnxvb.jpg',
        alt: 'Lake through trees',
        orientation: 'vertical',
        caption: 'Sunlight dancing on alpine waters'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783450/DSCF1675_qat6ez.jpg',
        alt: 'Geneva cafe scene',
        orientation: 'vertical',
        caption: 'No shop opens on Sun in Geneva'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783450/DSCF1556_go95c6.jpg',
        alt: 'Swiss countryside',
        orientation: 'horizontal',
        caption: 'Swiss chalets and cows'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783451/DSCF1623_nvmyu0.jpg',
        alt: 'Swiss mountain home',
        orientation: 'horizontal',
        caption: 'Misty mountains'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747783451/DSCF1719_j7dtv5.jpg',
        alt: 'Geneva Jet d\'Eau',
        orientation: 'horizontal',
        caption: 'The iconic Jet d\'Eau fountain'
      }
    ],
    title: 'Interlaken & Geneva'
  },

  {
    id: '18',
    latitude: 43.7696,
    longitude: 11.2558,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF1023_axivtk.jpg',
        alt: 'Florence street at night',
        orientation: 'vertical',
        caption: 'Medieval archway'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784317/DSCF0633_vtoh4l.jpg',
        alt: 'Tuscan window shutters',
        orientation: 'vertical',
        caption: 'Wooden shutters'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0805_iv3ulr.jpg',
        alt: 'Tuscan hillside town',
        orientation: 'vertical',
        caption: 'A Tuscan village'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0982_pu30mn.jpg',
        alt: 'Italian gelato shop',
        orientation: 'vertical',
        caption: 'Speechlessly good'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0795_lt51nr.jpg',
        alt: 'Cypress tree alley',
        orientation: 'vertical',
        caption: 'Cypress-lined path'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0703_kjgm48.jpg',
        alt: 'Jump into water',
        orientation: 'vertical',
        caption: 'Jump'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784319/DSCF1101_q8coye.jpg',
        alt: 'Florence cityscape',
        orientation: 'horizontal',
        caption: 'A city that remains the same for centuries'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784319/DSCF1216_dxhmis.jpg',
        alt: 'Ponte Vecchio sunset',
        orientation: 'horizontal',
        caption: 'Sunset over Arno River'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0846_p2ovdv.jpg',
        alt: 'Tuscan countryside',
        orientation: 'horizontal',
        caption: 'Tuscan countryside'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0754_rpunun.jpg',
        alt: 'Cinque Terre village',
        orientation: 'horizontal',
        caption: 'Manarola, Cinque Terre'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747784318/DSCF0636_zthf6j.jpg',
        alt: 'Italian coast sunbathers',
        orientation: 'horizontal',
        caption: 'Sunbathing by the Mediterranean Sea'
      }
    ],
    title: 'Tuscany & Florence'
  },

  {
    id: '19',
    latitude: 43.7102,
    longitude: 7.2620,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786296/DSCF9942_b7lpqo.jpg',
        alt: 'Sailboat masts in marina',
        orientation: 'vertical',
        caption: 'Sailboats in Marseille harbor'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786295/DSCF9931_atfg5n.jpg',
        alt: 'Poolside view of marina',
        orientation: 'vertical',
        caption: 'Pool time'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786273/DSCF0066_ob66ro.jpg',
        alt: 'Marseille cityscape',
        orientation: 'vertical',
        caption: 'Panoramic view of Marseille @ Notre-Dame de la Garde'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786273/DSCF0195_qizynt.jpg',
        alt: 'Colorful fishing village',
        orientation: 'vertical',
        caption: 'Port du Vallon des Auffes'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786295/DSCF9801_vc2s6n.jpg',
        alt: 'Art gallery entrance',
        orientation: 'horizontal',
        caption: 'Happiness is borning'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786274/DSCF0563_toqrrt.jpg',
        alt: 'Palm-lined promenade',
        orientation: 'horizontal',
        caption: 'Nice is nice'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786273/DSCF0297_jnfhtw.jpg',
        alt: 'Mediterranean beach view',
        orientation: 'horizontal',
        caption: 'The iconic blue chairs'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786274/DSCF0440_otj5b0.jpg',
        alt: 'Coastal cliff houses',
        orientation: 'horizontal',
        caption: 'Villas overlooking the ocean'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747786273/DSCF0265_f4yoxj.jpg',
        alt: 'Sunset over coastal town',
        orientation: 'horizontal',
        caption: 'Eze botanical garden'
      },
      
    ],
    title: 'Côte d\'Azur'
  }
  
  

  
    // {
  //   id: '7',
  //   latitude: 45.5017,
  //   longitude: -73.5673,
  //   images: [
  //     {
  //       url: 'path_to_montreal_image1',
  //       alt: 'Montreal scene 1',
  //       orientation: 'vertical',
  //       caption: 'Old Montreal'
  //     },
  //     // Add more Montreal images here
  //   ],
  //   title: 'tbd'
  // },
];

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const hasAnimationPlayed = useRef(false);

  const pathname = usePathname();
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 45,
    zoom: 1.4, // Start zoomed in for animation
    pitch: 0,
    bearing: 0,
  });

  const [mapLoaded, setMapLoaded] = useState(false);


  useEffect(() => {
    if (selectedPin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPin]);

  useEffect(() => {
    // Only run animation if map is loaded, we're on the create page, 
    // AND the animation hasn't played yet
    if (mapLoaded && pathname === '/n/create' && !hasAnimationPlayed.current) {
      let currentLongitude = 0;
      let currentZoom = 0.5; // Start very zoomed out (small globe)
      const targetZoom = 1.4; // End zoom level
      const totalSteps = 360 / 3; // 120 steps total
      const zoomIncrement = (targetZoom - currentZoom) / totalSteps; // ~0.0058 per step
      
      const rotationInterval = setInterval(() => {
        currentLongitude += 3; // Your current rotation speed
        currentZoom += zoomIncrement; // Zoom in gradually
        
        setViewState(prev => ({
          ...prev,
          longitude: currentLongitude,
          zoom: currentZoom, // Add the zoom animation
          transitionDuration: 15 // Your current transition speed
        }));
        
        if (currentLongitude >= 360) {
          clearInterval(rotationInterval);
          // Then reset longitude but keep the final zoom level
          setTimeout(() => {
            setViewState(prev => ({
              ...prev,
              zoom: 1.4, // Final zoom level
              longitude: 0,
              transitionDuration: 1000
            }));
            hasAnimationPlayed.current = true; // Mark animation as completed
          }, 500);
        }
      }, 15); // Your current interval speed

      // Cleanup function to clear interval if component unmounts
      return () => clearInterval(rotationInterval);
    }
  }, [mapLoaded, pathname]); // Keep the same dependencies

  return (
    <div className="min-h-screen bg-white">
      <div className={`relative ${selectedPin ? 'hidden md:block' : ''}`}>
        {children}
      </div>

      <div className={`absolute top-[100px] left-0 right-0 mx-auto max-w-[680px] px-8 
        ${pathname !== '/n/create' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${selectedPin ? 'hidden md:block' : ''}`}>
          
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onLoad={() => setMapLoaded(true)}
          style={{width: '100%', height: '80vh'}}
          mapStyle="mapbox://styles/zichenggu/cmax8lbgz002z01rc0wn54m59"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          attributionControl={false}
          boxZoom={false}
          dragRotate={false}
          touchZoomRotate={false}
          pitchWithRotate={false}
          maxPitch={0}
          minPitch={0}
        
    
        >
          {initialPins.map(pin => (
            <Marker
              key={pin.id}
              latitude={pin.latitude}
              longitude={pin.longitude}
              onClick={() => setSelectedPin(pin)}
            >
              <div 
                className="relative"
                onMouseEnter={() => setHoveredPin(pin.id)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <div className="w-2.5 h-2.5 bg-[#1E1E1E] rounded-full cursor-pointer" />
                
                {hoveredPin === pin.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded-md">
                    {pin.title} 
                  </div>
                )}
              </div>
            </Marker>
          ))}
        </Map>
      </div>

      {selectedPin && (
        <>
          <div 
            className="fixed inset-0 bg-gray-500/8 transition-all duration-300 ease-in-out z-20 md:block hidden"
            onClick={() => setSelectedPin(null)}
          />
          
          <div className="fixed inset-0 md:inset-auto md:top-0 md:right-0 md:w-1/2 md:h-screen bg-white 
            transition-transform duration-300 ease-in-out z-50 flex flex-col overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 md:p-8 md:pt-10 z-40">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{selectedPin?.title}</h2>
                <button 
                  onClick={() => setSelectedPin(null)}
                  className="p-2 hover:text-gray-600"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 px-6 md:px-8 pb-8">
              {selectedPin?.images
                .sort((a, b) => {
                  if (a.orientation === 'vertical' && b.orientation === 'horizontal') return -1;
                  if (a.orientation === 'horizontal' && b.orientation === 'vertical') return 1;
                  return 0;
                })
                .map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col
                      ${image.orientation === 'vertical' 
                        ? 'md:col-span-1 aspect-[3/4]' 
                        : 'md:col-span-2 aspect-[16/9]'}`}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <Image 
                        src={image.url}
                        alt={image.alt || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {image.caption && (
                      <p className="mt-2 text-gray-600 text-sm">{image.caption}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}