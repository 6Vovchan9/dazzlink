import { IAboutPersonalData } from "../interfaces";

export const OUR_TEAM_LIST_RU: Array<IAboutPersonalData> = [
    {
        name: 'Амаль',
        queryParamName: 'Amal`',
        position: 'Co-founder, CEO',
        photo: 'assets/images/team-page/photo/founder.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Профессионал c узбекскими корнями, объединяющий бизнес, технологии и психологию для инновационных решений.
                </div>
                <div class="aboutPersonParagraph">
                    Выпускник Hult International Business School по специальности «Бизнес-администрирование» и Bucknell University, где он изучал компьютерные науки.
                </div>
                <div class="aboutPersonParagraph">
                    Также он прошел дополнительные курсы по математике и психологии в Carnegie Mellon University, что позволило ему обрести уникальное понимание как аналитических процессов, так и человеческих аспектов бизнеса. Его интерес к коучингу и психологии взаимоотношений превратился из хобби в важную часть профессионального развития, вдохновив на глубокое изучение человеческого поведения и межличностных связей.
                </div>
                <div class="aboutPersonParagraph">
                    Сочетание бизнес-интуиции, технологической экспертизы и понимания психологии позволяет Амалю создавать инновационные решения, направленные на улучшение отношений и взаимодействий между людьми.
                </div>
            ` 
        }
    },
    {
        name: 'Малика',
        queryParamName: 'Malika',
        position: 'Co-founder, Head of Finance',
        photo: 'assets/images/team-page/photo/financier.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Эксперт в финансах, родившаяся в семье с узбекскими корнями.
                </div>
                <div class="aboutPersonParagraph">
                    Малика обладает степенью магистра в области финансов и аналитики, полученной в Kings College London, и имеет более 6 лет опыта в финансовой сфере, что делает её ценным специалистом с глубоким пониманием финансового анализа и управления.
                </div>
                <div class="aboutPersonParagraph">
                    Свою профессиональную карьеру она начала в Deloitte, где работала в качестве аудитора. После этого продолжила свой путь в EY, где занимала должность финансового консультанта. Также Малика являлась инвестиционным аналитиком в хедж-фонде, расположенном в Лондоне.
                </div>
            ` 
        }
    },
    {
        name: 'Алексей',
        queryParamName: 'Alexey',
        position: 'Head of Product and Design',
        photo: 'assets/images/team-page/photo/productOwner.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Эксперт в области создания цифровых продуктов с 8&#8288;-&#8288;летним опытом работы и узбекскими корнями.
                </div>
                <div class="aboutPersonParagraph">
                    Алексей с отличием закончил бакалавриат МГТУ им. Н.Э. Баумана по специальности «Информатика и вычислительная техника», а также магистратуру РУТ (МИИТ) по направлению «Прикладная информатика». Он также имеет профильное образование в области цифрового дизайна, которое получил, окончив Школу дизайна НИУ ВШЭ и Британскую высшую школу дизайна.
                </div>
                <div class="aboutPersonParagraph">
                    В роли дизайнера цифровых продуктов Алексей работал в ведущих финансовых организациях СНГ: Тинькофф, Альфа-Банк, Сбер, где создавал сервисы для десятков миллионов клиентов. Также он проектировал высоконагруженные сервисы, работая в IBM — одной из крупнейших в мире компаний по производству и поставке аппаратного и программного обеспечения, IT-сервисов и консалтинговых услуг.
                </div>
            ` 
        }
    },
    {
        name: 'Никита',
        queryParamName: 'Nikita',
        position: 'Head of Software Engineering and iOS',
        photo: 'assets/images/team-page/photo/ios.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Талантливый Software Engineer и Serial Founder, родившийся и выросший в Ташкенте.
                </div>
                <div class="aboutPersonParagraph">
                    С детства стремясь к созданию инновационных продуктов, Никита овладел глубокими познаниями в Mobile, Web, DevOps, Data Science и Pentest. Он также успешно прошел обучение в Yandex GoTo, Университете Дизайна и Технологии и во Всемирной школе программирования l’Ecole 42.
                </div>
                <div class="aboutPersonParagraph">
                    Его путь к успеху отмечен выдающимися достижениями, включая победы в хакатонах, таких как AngelHack, и руководство разработкой iOS-версии VK Bug Tracker.
                </div>
                <div class="aboutPersonParagraph">
                    Этот опыт положил начало его карьере серийного предпринимателя и технического директора в стартапах Rocket Foods, Pushka, SKIDOZ, FREEZONE и многих других.
                </div>
                <div class="aboutPersonParagraph">
                    Участие в акселерационных программах глобальных инкубаторов, таких как 500 Startups, подчеркивает его конкурентоспособность как инженера и технического лидера.
                </div>
            ` 
        }
    },
    // {
    //     name: 'Антон',
    //     queryParamName: 'Anton',
    //     position: 'Head of Architecture and Analytics',
    //     photo: 'assets/images/team-page/photo/architect.jpeg',
    //     details: {
    //         vita: `
    //             <div class="aboutPersonParagraph">
    //                 Опытный IT-эксперт с глубокими знаниями в проектировании сложных систем.
    //             </div>
    //             <div class="aboutPersonParagraph">
    //                 Начал участвовать в стартапах еще со студенческих лет и с тех пор накопил богатый опыт. Его карьера началась с позиции SQL-аналитика, после чего он занимал роли менеджера проектов, лида по системному анализу и архитектора.
    //             </div>
    //             <div class="aboutPersonParagraph">
    //                 Работая в организации, входящей в состав французской финансовой группы Societe Generale, Антон успешно реализовал множество проектов, где ключевыми требованиями были точность, безопасность и высокая скорость. Он возглавлял отдел системного анализа и архитектуры в международной компании, уделяя особое внимание проектированию высоконагруженных, стабильных и масштабируемых решений.
    //             </div>
    //         ` 
    //     }
    // },
    {
        name: 'Александр',
        queryParamName: 'Alexander',
        position: 'Head of Platform',
        photo: 'assets/images/team-page/photo/platform.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Опытный Backend-разработчик с глубокими знаниями Java.
                </div>
                <div class="aboutPersonParagraph">
                    Его увлечение программированием началось в школьные годы, когда в 12 лет он написал свои первые программы. После школы Александр с отличием окончил кафедру «Компьютерные системы и сети» МГТУ им. Н.Э. Баумана.
                </div>
                <div class="aboutPersonParagraph">
                    Во время учебы он активно участвовал в хакатонах, где неоднократно занимал призовые места. Карьеру Александр начал в фудтех-стартапах RocketFoods и Pushka, где занимал роли ведущего разработчика и архитектора, создавая сложные микросервисные решения.
                </div>
                <div class="aboutPersonParagraph">
                    С 2018 года Александр работал в организации, входящей в состав французской финансовой группы Societe Generale. Там он разрабатывал и поддерживал высоконагруженные системы, уделяя особое внимание вопросам безопасности и масштабируемости.
                </div>
            ` 
        }
    },
    {
        name: 'Станислав',
        queryParamName: 'Stanislav',
        position: 'Head of QA',
        photo: 'assets/images/team-page/photo/qa.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Эксперт в области тестирования и обеспечения качества (QA) с более чем 8-летним опытом в IT.
                </div>
                <div class="aboutPersonParagraph">
                    Он окончил МГУПИ по специальности «Информатика и вычислительная техника».
                </div>
                <div class="aboutPersonParagraph">
                    Станислав начал свою карьеру как системный администратор, а затем перешел в QA и работал с такими компаниями, как VK, Yandex, Delivery Club и inDrive.
                </div>
            ` 
        }
    },
    {
        name: 'Роман',
        queryParamName: 'Roman',
        position: 'Android Engineer',
        photo: 'assets/images/team-page/photo/android.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Талантливый Android-разработчик из Татарстана.
                </div>
                <div class="aboutPersonParagraph">
                    Начал программировать в 16 лет, увлёкшись созданием модов для Minecraft. Уже более 3 лет занимается мобильной разработкой, успел поучаствовать в буткемпе от VK, а также пройти стажировку в EPAM. 
                </div>
            ` 
        }
    },
    {
        name: 'Владимир',
        queryParamName: 'Vladimir',
        position: 'Frontend Engineer',
        photo: 'assets/images/team-page/photo/frontend.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Опытный Frontend разработчик с более чем 6-летним стажем в индустрии цифровых продуктов.
                </div>
                <div class="aboutPersonParagraph">
                    Владимир окончил МГТУ им. Н.Э. Баумана по специальности «Проектирование технических машин и комплексов», а затем получил второе высшее образование в области информационных технологий.
                </div>
                <div class="aboutPersonParagraph">
                    Специализируется на создании высоконагруженных систем и сервисов. Участвовал в разработке пользовательских интерфейсов для организации, входящей в состав французской финансовой группы Societe Generale.
                </div>
            ` 
        }
    },
    {
        name: 'Андрей',
        queryParamName: 'Andrey',
        position: 'Backend Engineer',
        photo: 'assets/images/team-page/photo/backend.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Квалифицированный Backend-разработчик.
                </div>
                <div class="aboutPersonParagraph">
                    Андрей получил высшее образование в ЯрГУ им. П.Г. Демидова по специальности «Электроника и наноэлектроника».
                </div>
                <div class="aboutPersonParagraph">
                    Решив переключиться на сферу ИТ, он начал с технической поддержки банковского ПО, затем продолжил работу с базами данных, что стало прочным фундаментом для его текущей деятельности в качестве Java-разработчика. Участвовал в разработке сервисов для организации, входящей в состав французской финансовой группы Societe Generale.
                </div>
            ` 
        }
    },
    {
        name: 'Полина',
        queryParamName: 'Polina',
        position: 'Graphic Designer',
        photo: 'assets/images/team-page/photo/graphicDesigner.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Амбициозный и талантливый дизайнер из Сибири. 
                </div>
                <div class="aboutPersonParagraph">
                    Своё творческое путешествие начала в 10 лет, поступив в художественную школу имени Сурикова. Достижения Полины в области искусства и литературы, включая победы на международных конкурсах, привели её в Школу дизайна НИУ ВШЭ.
                </div>
                <div class="aboutPersonParagraph">
                    Специализация Полины охватывает разработку комплексных систем брендинга, создание иллюстраций и графики для цифровых сервисов.
                </div>
                <div class="aboutPersonParagraph">
                    Её профессиональный опыт включает работу в ведущих брендинговых и рекламных агентствах, а также участие в создании дизайна для крупных мероприятий и шоу звёзд. Сотрудничала с международными компаниями, управляла проектами на позиции арт-директора и разрабатывала дизайн для масштабных событий.
                </div>
            ` 
        }
    },
    // {
    //     name: 'Игорь',
    //     position: 'Product Designer',
    //     photo: 'assets/images/team-page/photo/productDesigner.jpeg'
    // }
];

export const OUR_TEAM_LIST_EN: Array<IAboutPersonalData> = [
    {
        name: 'Амаль',
        queryParamName: 'Amal`',
        position: 'Co-founder, CEO',
        photo: 'assets/images/team-page/photo/founder.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Профессионал c узбекскими корнями, объединяющий бизнес, технологии и психологию для инновационных решений.
                </div>
                <div class="aboutPersonParagraph">
                    Выпускник Hult International Business School по специальности «Бизнес-администрирование» и Bucknell University, где он изучал компьютерные науки.
                </div>
                <div class="aboutPersonParagraph">
                    Также он прошел дополнительные курсы по математике и психологии в Carnegie Mellon University, что позволило ему обрести уникальное понимание как аналитических процессов, так и человеческих аспектов бизнеса. Его интерес к коучингу и психологии взаимоотношений превратился из хобби в важную часть профессионального развития, вдохновив на глубокое изучение человеческого поведения и межличностных связей.
                </div>
                <div class="aboutPersonParagraph">
                    Сочетание бизнес-интуиции, технологической экспертизы и понимания психологии позволяет Амалю создавать инновационные решения, направленные на улучшение отношений и взаимодействий между людьми.
                </div>
            ` 
        }
    },
    {
        name: 'Малика',
        queryParamName: 'Malika',
        position: 'Co-founder, Head of Finance',
        photo: 'assets/images/team-page/photo/financier.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Эксперт в финансах, родившаяся в семье с узбекскими корнями.
                </div>
                <div class="aboutPersonParagraph">
                    Малика обладает степенью магистра в области финансов и аналитики, полученной в Kings College London, и имеет более 6 лет опыта в финансовой сфере, что делает её ценным специалистом с глубоким пониманием финансового анализа и управления.
                </div>
                <div class="aboutPersonParagraph">
                    Свою профессиональную карьеру она начала в Deloitte, где работала в качестве аудитора. После этого продолжила свой путь в EY, где занимала должность финансового консультанта. Также Малика являлась инвестиционным аналитиком в хедж-фонде, расположенном в Лондоне.
                </div>
            ` 
        }
    },
    {
        name: 'Алексей',
        queryParamName: 'Alexey',
        position: 'Head of Product and Design',
        photo: 'assets/images/team-page/photo/productOwner.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Эксперт в области создания цифровых продуктов с 8&#8288;-&#8288;летним опытом работы и узбекскими корнями.
                </div>
                <div class="aboutPersonParagraph">
                    Алексей с отличием закончил бакалавриат МГТУ им. Н.Э. Баумана по специальности «Информатика и вычислительная техника», а также магистратуру РУТ (МИИТ) по направлению «Прикладная информатика». Он также имеет профильное образование в области цифрового дизайна, которое получил, окончив Школу дизайна НИУ ВШЭ и Британскую высшую школу дизайна.
                </div>
                <div class="aboutPersonParagraph">
                    В роли дизайнера цифровых продуктов Алексей работал в ведущих финансовых организациях СНГ: Тинькофф, Альфа-Банк, Сбер, где создавал сервисы для десятков миллионов клиентов. Также он проектировал высоконагруженные сервисы, работая в IBM — одной из крупнейших в мире компаний по производству и поставке аппаратного и программного обеспечения, IT-сервисов и консалтинговых услуг.
                </div>
            ` 
        }
    },
    {
        name: 'Никита',
        queryParamName: 'Nikita',
        position: 'Head of Software Engineering and iOS',
        photo: 'assets/images/team-page/photo/ios.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Талантливый Software Engineer и Serial Founder, родившийся и выросший в Ташкенте.
                </div>
                <div class="aboutPersonParagraph">
                    С детства стремясь к созданию инновационных продуктов, Никита овладел глубокими познаниями в Mobile, Web, DevOps, Data Science и Pentest. Он также успешно прошел обучение в Yandex GoTo, Университете Дизайна и Технологии и во Всемирной школе программирования l’Ecole 42.
                </div>
                <div class="aboutPersonParagraph">
                    Его путь к успеху отмечен выдающимися достижениями, включая победы в хакатонах, таких как AngelHack, и руководство разработкой iOS-версии VK Bug Tracker.
                </div>
                <div class="aboutPersonParagraph">
                    Этот опыт положил начало его карьере серийного предпринимателя и технического директора в стартапах Rocket Foods, Pushka, SKIDOZ, FREEZONE и многих других.
                </div>
                <div class="aboutPersonParagraph">
                    Участие в акселерационных программах глобальных инкубаторов, таких как 500 Startups, подчеркивает его конкурентоспособность как инженера и технического лидера.
                </div>
            ` 
        }
    },
    // {
    //     name: 'Антон',
    //     queryParamName: 'Anton',
    //     position: 'Head of Architecture and Analytics',
    //     photo: 'assets/images/team-page/photo/architect.jpeg',
    //     details: {
    //         vita: `
    //             <div class="aboutPersonParagraph">
    //                 Опытный IT-эксперт с глубокими знаниями в проектировании сложных систем.
    //             </div>
    //             <div class="aboutPersonParagraph">
    //                 Начал участвовать в стартапах еще со студенческих лет и с тех пор накопил богатый опыт. Его карьера началась с позиции SQL-аналитика, после чего он занимал роли менеджера проектов, лида по системному анализу и архитектора.
    //             </div>
    //             <div class="aboutPersonParagraph">
    //                 Работая в организации, входящей в состав французской финансовой группы Societe Generale, Антон успешно реализовал множество проектов, где ключевыми требованиями были точность, безопасность и высокая скорость. Он возглавлял отдел системного анализа и архитектуры в международной компании, уделяя особое внимание проектированию высоконагруженных, стабильных и масштабируемых решений.
    //             </div>
    //         ` 
    //     }
    // },
    {
        name: 'Александр',
        queryParamName: 'Alexander',
        position: 'Head of Platform',
        photo: 'assets/images/team-page/photo/platform.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Опытный Backend-разработчик с глубокими знаниями Java.
                </div>
                <div class="aboutPersonParagraph">
                    Его увлечение программированием началось в школьные годы, когда в 12 лет он написал свои первые программы. После школы Александр с отличием окончил кафедру «Компьютерные системы и сети» МГТУ им. Н.Э. Баумана.
                </div>
                <div class="aboutPersonParagraph">
                    Во время учебы он активно участвовал в хакатонах, где неоднократно занимал призовые места. Карьеру Александр начал в фудтех-стартапах RocketFoods и Pushka, где занимал роли ведущего разработчика и архитектора, создавая сложные микросервисные решения.
                </div>
                <div class="aboutPersonParagraph">
                    С 2018 года Александр работал в организации, входящей в состав французской финансовой группы Societe Generale. Там он разрабатывал и поддерживал высоконагруженные системы, уделяя особое внимание вопросам безопасности и масштабируемости.
                </div>
            ` 
        }
    },
    {
        name: 'Станислав',
        queryParamName: 'Stanislav',
        position: 'Head of QA',
        photo: 'assets/images/team-page/photo/qa.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Эксперт в области тестирования и обеспечения качества (QA) с более чем 8-летним опытом в IT.
                </div>
                <div class="aboutPersonParagraph">
                    Он окончил МГУПИ по специальности «Информатика и вычислительная техника».
                </div>
                <div class="aboutPersonParagraph">
                    Станислав начал свою карьеру как системный администратор, а затем перешел в QA и работал с такими компаниями, как VK, Yandex, Delivery Club и inDrive.
                </div>
            ` 
        }
    },
    {
        name: 'Роман',
        queryParamName: 'Roman',
        position: 'Android Engineer',
        photo: 'assets/images/team-page/photo/android.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Талантливый Android-разработчик из Татарстана.
                </div>
                <div class="aboutPersonParagraph">
                    Начал программировать в 16 лет, увлёкшись созданием модов для Minecraft. Уже более 3 лет занимается мобильной разработкой, успел поучаствовать в буткемпе от VK, а также пройти стажировку в EPAM. 
                </div>
            ` 
        }
    },
    {
        name: 'Владимир',
        queryParamName: 'Vladimir',
        position: 'Frontend Engineer',
        photo: 'assets/images/team-page/photo/frontend.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Опытный Frontend разработчик с более чем 6-летним стажем в индустрии цифровых продуктов.
                </div>
                <div class="aboutPersonParagraph">
                    Владимир окончил МГТУ им. Н.Э. Баумана по специальности «Проектирование технических машин и комплексов», а затем получил второе высшее образование в области информационных технологий.
                </div>
                <div class="aboutPersonParagraph">
                    Специализируется на создании высоконагруженных систем и сервисов. Участвовал в разработке пользовательских интерфейсов для организации, входящей в состав французской финансовой группы Societe Generale.
                </div>
            ` 
        }
    },
    {
        name: 'Андрей',
        queryParamName: 'Andrey',
        position: 'Backend Engineer',
        photo: 'assets/images/team-page/photo/backend.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Квалифицированный Backend-разработчик.
                </div>
                <div class="aboutPersonParagraph">
                    Андрей получил высшее образование в ЯрГУ им. П.Г. Демидова по специальности «Электроника и наноэлектроника».
                </div>
                <div class="aboutPersonParagraph">
                    Решив переключиться на сферу ИТ, он начал с технической поддержки банковского ПО, затем продолжил работу с базами данных, что стало прочным фундаментом для его текущей деятельности в качестве Java-разработчика. Участвовал в разработке сервисов для организации, входящей в состав французской финансовой группы Societe Generale.
                </div>
            ` 
        }
    },
    {
        name: 'Полина',
        queryParamName: 'Polina',
        position: 'Graphic Designer',
        photo: 'assets/images/team-page/photo/graphicDesigner.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Амбициозный и талантливый дизайнер из Сибири. 
                </div>
                <div class="aboutPersonParagraph">
                    Своё творческое путешествие начала в 10 лет, поступив в художественную школу имени Сурикова. Достижения Полины в области искусства и литературы, включая победы на международных конкурсах, привели её в Школу дизайна НИУ ВШЭ.
                </div>
                <div class="aboutPersonParagraph">
                    Специализация Полины охватывает разработку комплексных систем брендинга, создание иллюстраций и графики для цифровых сервисов.
                </div>
                <div class="aboutPersonParagraph">
                    Её профессиональный опыт включает работу в ведущих брендинговых и рекламных агентствах, а также участие в создании дизайна для крупных мероприятий и шоу звёзд. Сотрудничала с международными компаниями, управляла проектами на позиции арт-директора и разрабатывала дизайн для масштабных событий.
                </div>
            ` 
        }
    },
    // {
    //     name: 'Игорь',
    //     position: 'Product Designer',
    //     photo: 'assets/images/team-page/photo/productDesigner.jpeg'
    // }
];

export const OUR_TEAM_LIST_UZ: Array<IAboutPersonalData> = [
    {
        name: 'Amal',
        queryParamName: 'Amal`',
        position: 'Co-founder, CEO',
        photo: 'assets/images/team-page/photo/founder.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Biznes, texnologiyalar va psixologiyani innovatsion yechimlar uchun uygʻunlashtiruvchi oʻzbek ildizlariga ega professional.
                </div>
                <div class="aboutPersonParagraph">
                    Hult International Business School’ni “Biznes boshqaruvi” yoʻnalishi boʻyicha va Bucknell University’ni kompyuter fanlari boʻyicha tamomlagan bitiruvchi.
                </div>
                <div class="aboutPersonParagraph">
                    Shuningdek, u Carnegie Mellon University’da matematika va psixologiya bo‘yicha qo‘shimcha kurslarni tamomlagan. Bu unga analitik jarayonlar va biznesning insoniy jihatlarini chuqur tushunishga yordam berdi. Munosabatlar psixologiyasi va kouchingga bo‘lgan qiziqishi hobbidan kasbiy rivojlanishining muhim qismiga aylandi hamda inson xulq-atvori va shaxslararo aloqalarni chuqur o‘rganishga ilhom berdi.
                </div>
                <div class="aboutPersonParagraph">
                    Biznes intuitsiyasi, texnologik bilim va psixologik tushunchaning uyg‘unligi Amalyuga odamlar o‘rtasidagi munosabatlar va o‘zaro ta’sirlarni yaxshilashga qaratilgan innovatsion yechimlarni yaratishga imkon beradi.
                </div>
            ` 
        }
    },
    {
        name: 'Malika',
        queryParamName: 'Malika',
        position: 'Co-founder, Head of Finance',
        photo: 'assets/images/team-page/photo/financier.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Oʻzbek ildizlariga ega oilada tugʻilgan, moliya sohasidagi ekspert.
                </div>
                <div class="aboutPersonParagraph">
                    Malika Kings College London’da moliya va tahlil yo‘nalishi boʻyicha magistr darajasiga ega. U moliya sohasida 6 yildan ortiq tajribaga ega boʻlib, bu uni moliyaviy tahlil va boshqaruv sohasida chuqur bilimga ega boʻlgan qimmatli mutaxassisga aylantiradi.
                </div>
                <div class="aboutPersonParagraph">
                    U o‘z kasbiy faoliyatini Deloitte’da auditor sifatida boshlagan. Keyinchalik EY kompaniyasida moliyaviy maslahatchi lavozimida ishlashni davom ettirgan. Shuningdek, Malika Londonda joylashgan xedj-fondda investitsiya tahlilchisi sifatida faoliyat yuritgan.
                </div>
            ` 
        }
    },
    {
        name: 'Alexey',
        queryParamName: 'Alexey',
        position: 'Head of Product and Design',
        photo: 'assets/images/team-page/photo/productOwner.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    8 yillik tajribaga ega, oʻzbek ildizlariga ega raqamli mahsulotlar yaratish bo‘yicha ekspert.
                </div>
                <div class="aboutPersonParagraph">
                    Alexey “Informatika va hisoblash texnikasi” yo‘nalishi bo‘yicha MGTU nomidagi N.E. Bauman universitetining bakalavriat bosqichini imtiyoz bilan tamomlagan, shuningdek, RUT (MIIT)da “Amaliy informatika” magistrlik darajasiga ega. U raqamli dizayn sohasida ham tahsil olib, NIU VShE Dizayn maktabi va Britaniya Oliy Dizayn maktabini tamomlagan.
                </div>
                <div class="aboutPersonParagraph">
                    Raqamli mahsulotlar dizayneri sifatida Aleksey MDHning yetakchi moliyaviy tashkilotlarida — Tinkoff, Alfa-Bank, Sber’da ishlagan va o‘nlab million mijozlar uchun servislar yaratgan. Shuningdek, u IBM’da ishlagan vaqtida yuqori yuklama bilan ishlovchi tizimlarni loyihalashtirgan. IBM — dunyodagi eng yirik apparat va dasturiy ta’minot ishlab chiqaruvchilardan biri bo‘lib, IT-xizmatlar va konsalting sohasida ham yetakchi hisoblanadi.
                </div>
            ` 
        }
    },
    {
        name: 'Nikita',
        queryParamName: 'Nikita',
        position: 'Head of Software Engineering and iOS',
        photo: 'assets/images/team-page/photo/ios.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Toshkentda tug‘ilib o‘sgan, iqtidorli dasturiy ta’minot muhandisi va serial tadbirkor.
                </div>
                <div class="aboutPersonParagraph">
                    Yoshlikdan innovatsion mahsulotlar yaratishga intilgan Nikita Mobile, Web, DevOps, Data Science va Pentest yo‘nalishlarida chuqur bilimga ega bo‘lgan. U shuningdek Yandex GoTo, Dizayn va Texnologiyalar Universiteti hamda jahon miqyosidagi dasturlash maktabi l’École 42’da muvaffaqiyatli tahsil olgan.
                </div>
                <div class="aboutPersonParagraph">
                    Uning muvaffaqiyat sari yo‘li AngelHack kabi xakatonlardagi g‘alabalar va VK Bug Tracker’ning iOS-versiyasi ishlab chiqilishini boshqargani kabi yirik yutuqlar bilan ajralib turadi.
                </div>
                <div class="aboutPersonParagraph">
                    Bu tajriba uning Rocket Foods, Pushka, SKIDOZ, FREEZONE va boshqa ko‘plab startaplardagi seriyali tadbirkor hamda texnik direktor sifatidagi faoliyatining boshlanishiga asos bo‘ldi.
                </div>
                <div class="aboutPersonParagraph">
                    500 Startups kabi global inkubatorlarning akseleratsiya dasturlarida ishtirok etgani uning muhandis va texnik yetakchi sifatidagi raqobatbardoshligini yana bir bor tasdiqlaydi.
                </div>
            ` 
        }
    },
    // {
    //     name: 'Антон',
    //     queryParamName: 'Anton',
    //     position: 'Head of Architecture and Analytics',
    //     photo: 'assets/images/team-page/photo/architect.jpeg',
    //     details: {
    //         vita: `
    //             <div class="aboutPersonParagraph">
    //                 Опытный IT-эксперт с глубокими знаниями в проектировании сложных систем.
    //             </div>
    //             <div class="aboutPersonParagraph">
    //                 Начал участвовать в стартапах еще со студенческих лет и с тех пор накопил богатый опыт. Его карьера началась с позиции SQL-аналитика, после чего он занимал роли менеджера проектов, лида по системному анализу и архитектора.
    //             </div>
    //             <div class="aboutPersonParagraph">
    //                 Работая в организации, входящей в состав французской финансовой группы Societe Generale, Антон успешно реализовал множество проектов, где ключевыми требованиями были точность, безопасность и высокая скорость. Он возглавлял отдел системного анализа и архитектуры в международной компании, уделяя особое внимание проектированию высоконагруженных, стабильных и масштабируемых решений.
    //             </div>
    //         ` 
    //     }
    // },
    {
        name: 'Aleksandr',
        queryParamName: 'Aleksandr',
        position: 'Head of Platform',
        photo: 'assets/images/team-page/photo/platform.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Java bo‘yicha chuqur bilimga ega tajribali backend dasturchi.
                </div>
                <div class="aboutPersonParagraph">
                    Dasturlashga bo‘lgan qiziqishi maktab yillarida boshlangan — Aleksandr 12 yoshida o‘zining ilk dasturlarini yozgan. Maktabdan so‘ng u MGTU nomidagi N.E. Bauman universitetining “Kompyuter tizimlari va tarmoqlari” kafedrasini imtiyoz bilan tamomlagan.
                </div>
                <div class="aboutPersonParagraph">
                    O‘qish davomida u faol ravishda xakatonlarda ishtirok etib, bir necha bor sovrinli o‘rinlarni egallagan. Aleksandr o‘z kasbiy faoliyatini RocketFoods va Pushka kabi foodtech startaplarida boshlagan, bu yerda yetakchi dasturchi va arxitektor sifatida murakkab mikroxizmatli yechimlarni ishlab chiqqan.
                </div>
                <div class="aboutPersonParagraph">
                    2018-yildan boshlab Aleksandr Fransiyaning moliyaviy guruhi Societe Generale tarkibiga kiruvchi tashkilotda ishlagan. U yerda yuqori yuklamali tizimlarni ishlab chiqish va qo‘llab-quvvatlash bilan shug‘ullangan, ayniqsa xavfsizlik va masshtablanuvchanlik masalalariga alohida e’tibor qaratgan.
                </div>
            ` 
        }
    },
    {
        name: 'Stanislav',
        queryParamName: 'Stanislav',
        position: 'Head of QA',
        photo: 'assets/images/team-page/photo/qa.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    IT sohasida 8 yildan ortiq tajribaga ega testlash va sifatni taʼminlash (QA) boʻyicha ekspert.
                </div>
                <div class="aboutPersonParagraph">
                    U “Informatika va hisoblash texnikasi” yo‘nalishi bo‘yicha MGUPlni tamomlagan.
                </div>
                <div class="aboutPersonParagraph">
                    Stanislav o‘z faoliyatini tizim administratori sifatida boshlagan, keyinchalik QA sohasiga o‘tgan. U VK, Yandex, Delivery Club va inDrive kabi kompaniyalar bilan ishlagan.
                </div>
            ` 
        }
    },
    {
        name: 'Roman',
        queryParamName: 'Roman',
        position: 'Android Engineer',
        photo: 'assets/images/team-page/photo/android.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Tataristondan iqtidorli Android dasturchi.
                </div>
                <div class="aboutPersonParagraph">
                    U 16 yoshida dasturlashni boshlagan, Minecraft uchun modlar yaratishga qiziqib. Uch yildan ortiq mobil dasturlash bilan shug‘ullanadi, VK bootcampida ishtirok etgan va EPAMda stajirovka o‘tgan.
                </div>
            ` 
        }
    },
    {
        name: 'Vladimir',
        queryParamName: 'Vladimir',
        position: 'Frontend Engineer',
        photo: 'assets/images/team-page/photo/frontend.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    6 yildan ortiq tajribaga ega raqamli mahsulotlar sohasidagi tajribali frontend dasturchi.
                </div>
                <div class="aboutPersonParagraph">
                    Vladimir MGTU nomidagi N.E. Bauman universitetini “Texnik mashinalar va komplekslarni loyihalash” yo‘nalishi bo‘yicha tamomlagan, shundan so‘ng axborot texnologiyalari sohasida ikkinchi oliy ma’lumotni olgan.
                </div>
                <div class="aboutPersonParagraph">
                    Yuqori yuklamali tizimlar va servislar yaratishga ixtisoslashgan. Fransuz moliyaviy guruhi Societe Generale tarkibiga kiruvchi tashkilot uchun foydalanuvchi interfeyslarini ishlab chiqishda ishtirok etgan.
                </div>
            ` 
        }
    },
    {
        name: 'Andrey',
        queryParamName: 'Andrey',
        position: 'Backend Engineer',
        photo: 'assets/images/team-page/photo/backend.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Malakali backend dasturchi.
                </div>
                <div class="aboutPersonParagraph">
                    Andrey P.G. Demidov nomidagi Yaroslavl davlat universitetida “Elektronika va nanoelektronika” yo‘nalishi bo‘yicha oliy ma’lumot olgan.
                </div>
                <div class="aboutPersonParagraph">
                    IT sohasiga o‘tishga qaror qilgan Andrey dastlab bank dasturiy ta’minotiga texnik yordam ko‘rsatishdan boshlagan. Keyinchalik u ma’lumotlar bazalari bilan ishlagan, bu esa uning hozirgi Java dasturchisi sifatidagi faoliyati uchun mustahkam asos bo‘ldi. U Fransiyaning Societe Generale moliyaviy guruhiga kiruvchi tashkilot uchun servislar ishlab chiqishda ishtirok etgan.
                </div>
            ` 
        }
    },
    {
        name: 'Polina',
        queryParamName: 'Polina',
        position: 'Graphic Designer',
        photo: 'assets/images/team-page/photo/graphicDesigner.jpeg',
        details: {
            vita: `
                <div class="aboutPersonParagraph">
                    Sibirlik ambitsiyali va iqtidorli dizayner.
                </div>
                <div class="aboutPersonParagraph">
                    Polina oʻz ijodiy yoʻlini 10 yoshida Surikov nomidagi sanʼat maktabiga kirish bilan boshlagan. Sanʼat va adabiyot sohasidagi yutuqlari, jumladan, xalqaro tanlovlardagi gʻalabalari uni NIU VShE Dizayn maktabiga olib keldi.
                </div>
                <div class="aboutPersonParagraph">
                    Polinaning ixtisosligi — brendingning murakkab tizimlarini ishlab chiqish, raqamli servislar uchun illyustratsiyalar va grafikalar yaratish.
                </div>
                <div class="aboutPersonParagraph">
                    U yetakchi brending va reklama agentliklarida ishlagan, yirik tadbirlar va yulduzlar shoulari uchun dizayn yaratishda ishtirok etgan. Xalqaro kompaniyalar bilan hamkorlik qilgan, art-direktor sifatida loyihalarni boshqargan va keng ko‘lamli tadbirlar uchun dizayn ishlab chiqqan.
                </div>
            ` 
        }
    },
    // {
    //     name: 'Игорь',
    //     position: 'Product Designer',
    //     photo: 'assets/images/team-page/photo/productDesigner.jpeg'
    // }
];