# События и измерения

Каждая запись: session_id, session_type (demo / participant), event, timestamp (ISO UTC), elapsed_ms, data. Для пользовательского анализа использовать только participant. ФИО, свободный текст и контакты в события не записываются. Хранение локальное, JSON/CSV выгружаются вручную. Предпочтения формы сохраняются только в браузере.

| Событие | Данные | Назначение |
|---|---|---|
| session_start | version | Новая сессия и версия |
| task_start | — | Начало задания после выхода из раздела исследования |
| request_submit | budget, interest_count | Пройден ввод |
| validation_error | reason | Ошибка заполнения |
| recommendations_shown | item_ids, count, fallback | Получена выдача |
| item_open / item_close | item_id для открытия | Просмотр карточки |
| wishlist_add / wishlist_remove | item_id, count | Изменение списка |
| wishlist_open | count | Пользователь открыл список |
| feedback | item_id, value | like / dislike / already_have |
| feedback_clear | item_id, previous | Отмена оценки |
| request_edit | — | Возврат к анкете |
| external_search | item_id | Переход к поиску похожего |
| page_reload | — | Повторное открытие страницы |
| runtime_error | message | Ошибка JavaScript |
| log_export | format | Выгрузка журнала |

Отсутствие runtime_error не доказывает отсутствие usability-проблем. Критичность и помощь модератора размечаются в протоколе. Логи — техническое подтверждение последовательности, не замена наблюдению. Лайки не обучают модель в текущей версии.
