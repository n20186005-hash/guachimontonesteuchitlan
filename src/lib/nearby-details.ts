import type { NearbySlug } from './nearby';

type Detail = { culture: string; experience: string; checklist: string[]; photoSpots: string[]; questions: { q: string; a: string }[] };
export const nearbyDetails: Record<'es' | 'en' | 'zh', Record<NearbySlug, Detail>> = {
  es: {
    'phil-weigand-center': {
      culture: 'El centro ayuda a reconocer una tradición cultural del occidente de México a menudo menos conocida que los grandes centros de otras regiones. La presentación de objetos, investigación y modelos ofrece contexto para leer la organización social y ceremonial del paisaje.',
      experience: 'Dedica una primera etapa a la sala y después sal al terreno: el contraste entre un modelo a escala y el conjunto monumental real es uno de los aprendizajes más útiles de esta parada.',
      checklist: ['Revisar si las salas están disponibles el día de visita', 'Respetar indicaciones para fotografías y piezas arqueológicas', 'Prever una caminata posterior por el sitio abierto'],
      photoSpots: ['Detalles de la exposición cuando esté autorizado', 'Paneles y maquetas para recordar la distribución de los círculos', 'Vista exterior que relacione el centro con el paisaje arqueológico'],
      questions: [{ q: '¿Qué aporta el centro al recorrido?', a: 'Explica hallazgos y modelos que permiten interpretar las estructuras del exterior.' }, { q: '¿Es el mismo punto que la plaza de Teuchitlán?', a: 'No. Se encuentra junto al acceso arqueológico, fuera del centro urbano.' }, { q: '¿Cuánto tiempo reservar?', a: 'Depende de las salas abiertas y del interés en las exposiciones; deja un margen adicional antes del recorrido al aire libre.' }],
    },
    'teuchitlan-main-plaza': {
      culture: 'La plaza es un escenario de vida comunitaria. Permite apreciar el ritmo del municipio, su jardín central y la relación entre calles, comercios y espacios de reunión, en contraste con el patrimonio prehispánico de las afueras.',
      experience: 'Una visita breve permite recorrer el quiosco, observar la vegetación, descansar a la sombra y decidir la siguiente parada. La experiencia depende del día y de las actividades locales.',
      checklist: ['Mantener libres los pasos y accesos', 'Evitar interrumpir actos públicos', 'Distinguir horarios de comercios de la disponibilidad del espacio abierto'],
      photoSpots: ['Quiosco desde la esquina del jardín', 'Arcos y escalinatas del quiosco', 'Bancas y arbolado que enmarcan la plaza'],
      questions: [{ q: '¿Hay entrada?', a: 'La plaza es un espacio público; los servicios privados cercanos tienen sus propios precios.' }, { q: '¿Queda junto a las pirámides?', a: 'No. Está en la cabecera de Teuchitlán; la zona arqueológica tiene otro acceso.' }, { q: '¿Qué se puede hacer aquí?', a: 'Pasear, observar la arquitectura del quiosco y realizar una pausa durante la visita al municipio.' }],
    },
    'presa-la-vega': {
      culture: 'La relación del municipio con su paisaje acuático también aparece en la cocina regional. Los establecimientos junto a la ribera forman parte de las excursiones descritas por las rutas turísticas de Jalisco.',
      experience: 'El valor del lugar está en contemplar la extensión del agua, observar aves cuando las condiciones lo permiten y descansar con vista a las montañas. Las actividades acuáticas dependen de normas y operadores locales.',
      checklist: ['Seleccionar con anticipación un acceso público específico', 'Revisar clima, viento y posibles avisos sobre el agua', 'No entrar en zonas privadas ni alterar el hábitat de aves'],
      photoSpots: ['Panorámica que incluya el agua y las montañas', 'Vegetación de ribera desde un acceso seguro', 'Aves a distancia, sin acercarse a zonas de descanso o nidificación'],
      questions: [{ q: '¿La foto muestra la ribera exacta de llegada?', a: 'No. La panorámica está tomada desde Guachimontones hacia la laguna; elige por separado tu acceso a la orilla.' }, { q: '¿Se puede navegar?', a: 'Consulta operadores autorizados y condiciones de seguridad actualizadas antes de considerar una actividad en el agua.' }, { q: '¿Se combina con Guachimontones?', a: 'Sí, ambos están en el entorno de Teuchitlán, pero tienen ubicaciones y accesos distintos.' }],
    },
  },
  en: {
    'phil-weigand-center': {
      culture: 'The center presents a western Mexican cultural tradition that receives less attention than the monumental sites of other regions. Objects, research and interpretive models help visitors understand the ceremonial landscape.',
      experience: 'Explore the displays first, then compare a scale model with the full-sized circular complexes outside. The shift in perspective is a useful part of the visit.',
      checklist: ['Check which galleries are open', 'Respect photography and object-handling rules', 'Leave time for the outdoor archaeological walk'],
      photoSpots: ['Exhibit details where photography is allowed', 'Interpretive panels and models of the circular plans', 'An outdoor view connecting the center to the site'],
      questions: [{ q: 'Why visit the center?', a: 'Its exhibits explain discoveries and models that help interpret the outdoor ruins.' }, { q: 'Is it in the town square?', a: 'No. It is associated with the archaeological area outside the town center.' }, { q: 'How long should I allow?', a: 'It depends on available exhibits and your interests; leave extra time before the outdoor walk.' }],
    },
    'teuchitlan-main-plaza': {
      culture: 'The square is part of everyday community life. It shows how the municipal garden, streets and local businesses connect, offering a contrast to the archaeological landscape beyond town.',
      experience: 'Walk around the bandstand, rest under the trees and plan your next stop. Local activities can make the atmosphere different from one day to the next.',
      checklist: ['Keep entrances and pedestrian routes clear', 'Respect public gatherings', 'Do not confuse business hours with access to the outdoor square'],
      photoSpots: ['Bandstand framed from a garden corner', 'Architectural details of its steps and arches', 'Benches and shaded trees surrounding the square'],
      questions: [{ q: 'Is there an entrance fee?', a: 'The square is a public space; nearby private services set their own prices.' }, { q: 'Is it beside the pyramids?', a: 'No. The archaeological site has a separate entrance outside the town center.' }, { q: 'What is there to do?', a: 'Take a short walk, study the bandstand and pause during a visit to Teuchitlán.' }],
    },
    'presa-la-vega': {
      culture: 'The reservoir also connects with regional food traditions. Lakeside restaurants are a familiar stop on tourism routes through this part of Jalisco.',
      experience: 'Enjoy broad water views, look for birds where conditions allow and pause against a backdrop of hills. Water-based activities depend on local rules and operators.',
      checklist: ['Choose a specific public shoreline access point', 'Check weather, wind and local water advisories', 'Avoid private shorelines and wildlife habitats'],
      photoSpots: ['A wide view across water to the hills', 'Lakeside vegetation from a safe approach', 'Birdlife from a respectful distance'],
      questions: [{ q: 'Is the photo taken at the lakeside access?', a: 'No. The panorama was taken from Guachimontones toward the lagoon; choose your lakeside access separately.' }, { q: 'Can I go boating?', a: 'Check current authorized operators and safety restrictions before considering water activities.' }, { q: 'Can it be combined with Guachimontones?', a: 'Yes, both are near Teuchitlán but have separate destinations and access points.' }],
    },
  },
  zh: {
    'phil-weigand-center': {
      culture: '特乌奇特兰文化是墨西哥西部的重要考古传统。通过展品、研究介绍与复原模型，游客可以理解圆形祭仪空间的社会与文化背景，而不只停留在建筑外观。',
      experience: '建议先看室内模型和展板，再到户外对照真实圆形建筑群；模型与实景之间的尺度差异，是解说中心最有价值的观察体验之一。',
      checklist: ['核对当日开放的展厅', '遵守展品触碰和摄影规定', '为之后的户外考古步道预留时间'],
      photoSpots: ['允许摄影的馆内展品细节', '解释圆形建筑布局的模型与展板', '将解说中心和遗址环境联系起来的室外视角'],
      questions: [{ q: '为什么要先参观解说中心？', a: '室内研究和模型能帮助理解户外遗迹的形态与用途。' }, { q: '解说中心在镇中心广场吗？', a: '不是，它与镇外考古区相连。' }, { q: '需要停留多久？', a: '取决于开放展厅和个人兴趣，建议给户外步行另留时间。' }],
    },
    'teuchitlan-main-plaza': {
      culture: '广场是当地居民日常活动的市镇公共空间，花园、街道与周边商铺共同展现特乌奇特兰的当代生活，与郊外考古遗址形成鲜明对比。',
      experience: '绕行凉亭、在树荫下休息并安排下一站，便能完成一次舒适的短途游览。不同日期的社区活动也会改变广场的氛围。',
      checklist: ['保持步道及入口畅通', '尊重当地公共活动', '不要将周边商家的营业时间误认为广场开放时间'],
      photoSpots: ['从花园角落完整拍摄凉亭', '凉亭台阶与拱廊细节', '长椅和树木框出的市镇景观'],
      questions: [{ q: '中央广场需要门票吗？', a: '这是公共广场，周边私人服务则可能收费。' }, { q: '广场就在圆形金字塔旁吗？', a: '不是，考古区位于镇外，拥有独立入口。' }, { q: '适合安排什么活动？', a: '短途散步、观察凉亭建筑、休息及连接镇内其他行程。' }],
    },
    'presa-la-vega': {
      culture: '水库与当地饮食文化相连，沿岸餐厅是哈利斯科州旅游线路中常见的停靠点。自然景观与地方生活让这里有别于单纯的考古参观。',
      experience: '欣赏开阔水面、远山及可能出现的鸟类，是这处景点最直接的体验。任何水上活动都应先核对当地规定和运营者。',
      checklist: ['提前选择具体的公共岸边入口', '查看天气、风况和水域公告', '避免进入私人岸线及干扰鸟类栖地'],
      photoSpots: ['水面与山丘同框的全景', '安全入口旁的岸边植被', '保持距离拍摄的鸟类活动'],
      questions: [{ q: '页面照片就是游客入口吗？', a: '不是，这张全景从 Guachimontones 朝向湖区拍摄，实际岸边入口需另行选择。' }, { q: '可以乘船吗？', a: '应先核对当期合法经营项目及水域安全规定。' }, { q: '能与考古遗址一起游览吗？', a: '可以，两者同在特乌奇特兰附近，但导航地点及入口不同。' }],
    },
  },
};
