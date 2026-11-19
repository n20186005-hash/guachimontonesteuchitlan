export const exploreSlugs = ['from-guadalajara', 'tickets-hours', 'circular-pyramids'] as const;
export type ExploreSlug = (typeof exploreSlugs)[number];
type Entry = { title: string; description: string; intro: string; sections: { heading: string; text: string; points?: string[] }[] };
type Language = 'es' | 'en' | 'zh';

export const explore: Record<Language, Record<ExploreSlug, Entry>> = {
  es: {
    'from-guadalajara': {
      title: 'Cómo llegar a Guachimontones desde Guadalajara',
      description: 'Ruta y consejos para visitar las pirámides circulares de Teuchitlán desde Guadalajara, Jalisco.',
      intro: 'Guachimontones está cerca de Teuchitlán, al oeste de Guadalajara. Prepara el traslado de ida y vuelta antes de salir, especialmente si no viajas en automóvil.',
      sections: [
        { heading: 'Ubicación y punto de llegada', text: 'Busca “Zona Arqueológica Teuchitlán o Guachimontones” en Google Maps, no solamente el centro de Teuchitlán. Confirma la ruta a la entrada del sitio antes de iniciar el viaje.', points: ['Destino: zona arqueológica, Teuchitlán, Jalisco', 'El recorrido incluye acceso al recinto y sectores al aire libre', 'Guarda una ruta de regreso antes de comenzar la visita'] },
        { heading: 'En automóvil', text: 'Revisa el tráfico y las condiciones del trayecto desde tu punto de salida en Guadalajara. Considera tiempo adicional para estacionar y caminar dentro de la zona arqueológica.' },
        { heading: 'En transporte público', text: 'Comprueba las salidas y el destino final de los autobuses o transportes regionales hacia Teuchitlán. El traslado del poblado al acceso arqueológico puede requerir otro medio de transporte; no supongas que el autobús llega a la entrada.' },
        { heading: 'Itinerario sugerido', text: 'Reserva primero el tiempo de traslado. Una vez dentro, comienza por la información interpretativa y recorre los conjuntos circulares a pie; deja margen para pausas, fotografías y regreso.' },
        { heading: 'Preguntas frecuentes', text: '¿Se puede ir y volver el mismo día? Sí, es una excursión posible desde Guadalajara si se coordinan horarios y transporte. ¿Conviene contratar recorrido? Depende de si prefieres un traslado organizado y explicación guiada.' },
      ],
    },
    'tickets-hours': {
      title: 'Boletos y horarios de Guachimontones: qué revisar antes de ir',
      description: 'Guía de entradas, horarios, cierre semanal y planificación de la visita a Guachimontones.',
      intro: 'Los precios, descuentos y horarios de las zonas arqueológicas pueden cambiar. Consulta la ficha vigente del INAH antes de salir y verifica las condiciones de acceso del día.',
      sections: [
        { heading: 'Dónde consultar los boletos', text: 'La ficha del Instituto Nacional de Antropología e Historia (INAH) es la referencia principal para tarifas y condiciones. Evita basarte en anuncios antiguos o en precios de tours que combinan transporte y entrada.' },
        { heading: 'Horarios y días de apertura', text: 'Comprueba la hora de apertura, el último acceso y los posibles cierres temporales en la ficha oficial. Una búsqueda de “guachimontones horario” puede mostrar horarios desactualizados; confirma la fecha de la información.' },
        { heading: 'Qué puede cambiar el costo', text: 'Revisa si la tarifa se expresa por persona y si existen supuestos de exención o descuentos. Un tour de Guadalajara puede cobrar traslado y guía por separado de la entrada al recinto.' },
        { heading: 'Preparación práctica', text: 'Lleva agua, calzado adecuado para caminar y protección solar. Las áreas exteriores requieren tiempo y exposición al clima; comprueba las condiciones meteorológicas antes de salir.', points: ['Consulta la ficha oficial el mismo día', 'Confirma los medios de pago disponibles', 'Verifica acceso y servicios si viajas con niños o personas con movilidad reducida'] },
        { heading: 'Preguntas frecuentes', text: '¿Se necesita reservar? Verifica la modalidad de acceso vigente directamente con la administración. ¿Hay que comprar boleto para un tour? Distingue entre el costo del paquete turístico y el acceso a la zona arqueológica.' },
      ],
    },
    'circular-pyramids': {
      title: 'Las pirámides circulares de Guachimontones',
      description: 'Historia, arquitectura y claves para observar las estructuras circulares de la tradición Teuchitlán en Jalisco.',
      intro: 'Guachimontones destaca por su arquitectura ceremonial circular, una forma distinta de las pirámides escalonadas más conocidas de México.',
      sections: [
        { heading: '¿Qué son los guachimontones?', text: 'Los conjuntos monumentales se relacionan con la tradición Teuchitlán del occidente de México. Su organización combina una estructura central y plataformas dispuestas alrededor de espacios circulares.' },
        { heading: 'Cómo leer la arquitectura', text: 'Observa la relación entre el centro, el anillo del patio y las plataformas periféricas. Las distintas alturas permiten reconocer el diseño del conjunto sin reducirlo a una sola “pirámide”.' },
        { heading: 'Historia y paisaje', text: 'El sitio forma parte de un paisaje arqueológico más amplio en Jalisco. Para distinguir interpretaciones arqueológicas de hipótesis populares, consulta la información del INAH y la señalización del recinto.' },
        { heading: 'Ruta de observación', text: 'Empieza con una vista general de un conjunto circular. Después compara el eje central y las plataformas; al caminar cambia de ángulo para entender cómo se organizaba el espacio.', points: ['Fotografía primero el conjunto completo', 'Busca detalles de la relación entre plataformas y patio', 'Respeta los senderos y las zonas restringidas'] },
        { heading: 'Preguntas frecuentes', text: '¿Por qué son redondas? La planta circular es una característica distintiva de esta tradición arquitectónica. ¿Todas las estructuras son idénticas? No; compara sus dimensiones y estado de conservación durante el recorrido.' },
      ],
    },
  },
  en: {
    'from-guadalajara': {
      title: 'Guachimontones pyramids from Guadalajara: how to visit',
      description: 'Plan a day trip from Guadalajara to the circular pyramids at Teuchitlán, Jalisco.',
      intro: 'Guachimontones is near Teuchitlán, west of Guadalajara. Plan the outbound and return journeys in advance, particularly without a car.',
      sections: [
        { heading: 'Find the right entrance', text: 'Use “Zona Arqueológica Teuchitlán o Guachimontones” as your map destination rather than the town center alone. Check the route to the archaeological entrance.' },
        { heading: 'Driving from Guadalajara', text: 'Check live traffic and road conditions before departure. Allow extra time for parking and walking around the archaeological grounds.' },
        { heading: 'Public transport', text: 'Confirm current regional services to Teuchitlán and their return times. Travel from the town to the archaeological entrance may require a separate transfer.' },
        { heading: 'A flexible day-trip plan', text: 'Set aside time for the journey, site interpretation, walking the circular complexes, rest stops and photography. Keep a realistic margin for your return.' },
        { heading: 'Frequently asked questions', text: 'Can you go in one day? Yes, if transport and site hours align. Is a guided tour essential? No; it is an option for travelers who prefer arranged transport and commentary.' },
      ],
    },
    'tickets-hours': {
      title: 'Guachimontones tickets and opening hours',
      description: 'Where to verify entry fees, opening days and access arrangements at Guachimontones.',
      intro: 'Admission prices, reductions and operating hours can change. Check the current INAH listing before traveling.',
      sections: [
        { heading: 'Where to check ticket prices', text: 'Use the National Institute of Anthropology and History (INAH) listing for current admission rules. Tour prices may include transportation and guiding, so do not confuse them with site admission.' },
        { heading: 'Opening days and last entry', text: 'Check the official opening schedule, last admission time and temporary closure notices. Older search snippets can be out of date.' },
        { heading: 'Planning costs', text: 'Check whether prices are per visitor and whether an exemption or reduced fee applies. Confirm how payments are accepted before departure.' },
        { heading: 'What to bring', text: 'Wear comfortable walking shoes, bring water and sun protection, and check the weather. Outdoor archaeological paths can take time to explore.' },
        { heading: 'Frequently asked questions', text: 'Do tickets require advance booking? Check the current official arrangements. Does a tour include admission? Verify the individual tour operator’s inclusions.' },
      ],
    },
    'circular-pyramids': {
      title: 'Guachimontones circular pyramids: history and architecture',
      description: 'Explore the round ceremonial complexes of the Teuchitlán tradition in western Mexico.',
      intro: 'Guachimontones is noted for circular ceremonial architecture, unlike the more familiar rectangular stepped pyramids at many Mexican sites.',
      sections: [
        { heading: 'What are the circular complexes?', text: 'The monumental groups belong to the Teuchitlán tradition in western Mexico. Central structures and surrounding platforms define circular open spaces.' },
        { heading: 'What to look for', text: 'Compare the central feature, courtyard ring and peripheral platforms. Their arrangement is easier to understand from more than one viewpoint.' },
        { heading: 'Archaeology and landscape', text: 'The site is part of a broader archaeological landscape in Jalisco. Use INAH interpretation and on-site signs to distinguish documented findings from speculation.' },
        { heading: 'Suggested walking sequence', text: 'Start with a wide view, compare the central and surrounding elements, and photograph the changes in perspective as you move along designated trails.' },
        { heading: 'Frequently asked questions', text: 'Why are they round? Circular planning defines this architectural tradition. Are all complexes alike? No; dimensions and preservation vary.' },
      ],
    },
  },
  zh: {
    'from-guadalajara': {
      title: '从瓜达拉哈拉前往 Guachimontones 圆形金字塔',
      description: '瓜达拉哈拉至特乌奇特兰考古遗址的交通、路线及一日游安排。',
      intro: '遗址位于哈利斯科州特乌奇特兰附近、瓜达拉哈拉以西。建议出发前安排好去程与返程，尤其是搭乘公共交通的旅客。',
      sections: [
        { heading: '确认正确目的地', text: '地图应搜索“Zona Arqueológica Teuchitlán o Guachimontones”，不要只导航至特乌奇特兰镇中心。出发前确认遗址入口路线。' },
        { heading: '自驾交通', text: '从瓜达拉哈拉出发前查看实时路况；为停车以及遗址内部步行预留时间。' },
        { heading: '大众交通', text: '先核对开往特乌奇特兰的区域交通班次和回程时间。镇区到考古遗址入口可能仍需转乘，不能假定巴士直接抵达入口。' },
        { heading: '一日游路线', text: '先安排往返交通，再依序了解遗址背景、步行观察圆形建筑群、休息及拍照；不要把返程排得过紧。' },
        { heading: '常见问题', text: '当天往返可行吗？交通与开放时间配合时可以。必须参加导览吗？并非必须，导览适合希望有人安排交通及讲解的旅客。' },
      ],
    },
    'tickets-hours': {
      title: 'Guachimontones 门票与开放时间指南',
      description: '核对特乌奇特兰考古遗址门票、开放日及入场条件的实用指南。',
      intro: '票价、优惠与开放时间可能调整，出发当天请先以墨西哥国家人类学与历史研究所（INAH）的最新页面为准。',
      sections: [
        { heading: '门票查询', text: '以 INAH 官方遗址条目核对票价与优惠资格。旅行团的费用可能包括交通、导览，与遗址门票不是同一个概念。' },
        { heading: '开放日及最后入场', text: '请核对官方开放时间、最后入场时段与临时关闭公告；搜索结果中的旧资料可能已经过期。' },
        { heading: '费用与支付', text: '确认价格是否按人计算、是否符合减免条件，以及现场接受哪些支付方式。' },
        { heading: '游览准备', text: '建议准备饮水、防晒用品、适合步行的鞋子，并查看天气。遗址户外区域需要一定步行时间。' },
        { heading: '常见问题', text: '需要预约吗？请查阅官方当期入场安排。参加旅行团是否包含门票？应向旅行团分别确认门票、交通和导览项目。' },
      ],
    },
    'circular-pyramids': {
      title: 'Guachimontones 圆形金字塔：历史与建筑',
      description: '了解哈利斯科州特乌奇特兰文化传统的环形祭仪建筑与观察重点。',
      intro: '这里以独特的环形祭仪建筑闻名，与墨西哥其他地区常见的阶梯式金字塔布局不同。',
      sections: [
        { heading: '什么是圆形建筑群？', text: '这些遗迹与墨西哥西部特乌奇特兰传统有关。中心结构、周围平台与圆形开放空间组成具有辨识度的建筑群。' },
        { heading: '建筑观察重点', text: '从不同角度比较中心结构、环形庭院及外围平台之间的关系，比只看单一“金字塔”更能理解规划方式。' },
        { heading: '考古与地景', text: '遗址属于哈利斯科州更广阔的考古地景。历史解释应参考 INAH 的研究说明和现场解说牌，区分考古成果与民间推测。' },
        { heading: '步行及拍摄路线', text: '先拍建筑群全景，再观察中心与外围平台的关系；沿规定步道变换视角，留意开放与限制区域。' },
        { heading: '常见问题', text: '为何采用圆形？圆形规划是当地建筑传统的重要特色。每座建筑群都一样吗？不同建筑的尺度和保存状况有所区别。' },
      ],
    },
  },
};
