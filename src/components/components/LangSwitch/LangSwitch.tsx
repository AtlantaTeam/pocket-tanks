import React, { useEffect, useState } from 'react';
import { i18n, languages, useTranslation } from 'i18n';
import { userAPI } from 'api/user-api';
import { useSelector } from 'react-redux';
import { DropDown } from 'components/components/DropDown/DropDown';
import { Label } from 'components/components/Forms/components/Input/components/Label/Label';
import { getUserId, getUserLang } from '../../../redux/selectors/user-state';

const languagesDDValues = Object.keys(languages).map((l, idx) => ({ id: idx, name: l }));
const getLangId = (lang: string) => {
    const res = languagesDDValues.filter((l) => l.name === lang);
    return res[0]?.id || 0;
};

export const LangSwitch = () => {
    const userId = useSelector(getUserId);
    const userLang = useSelector(getUserLang);
    if (document.documentElement.lang !== i18n.resolvedLanguage) {
        document.documentElement.lang = i18n.resolvedLanguage;
    }
    const [lang, setLang] = useState<string>(i18n.resolvedLanguage || i18n.language);
    const { t } = useTranslation();

    useEffect(() => {
        if (!userId || document?.documentElement?.lang === lang) {
            return;
        }
        i18n.changeLanguage(lang.toLowerCase())
            .then(() => true)
            .catch((err) => {
                console.log(err);
            });
        userAPI.setLang(userId, lang)
            .then((res) => {
                if (res.status === 201) {
                    window.location.reload();
                }
                return true;
            }).catch((err) => {
                console.log(err);
            });
    }, [userLang, lang]);

    return (
        <>
            <DropDown
                selectedValue={{ id: getLangId(lang), name: lang }}
                values={languagesDDValues}
                onChange={(langValue) => {
                    setLang(langValue.name);
                }}
                isColorActive={false}
            />
            <Label
                className="label"
                text={t('language')}
            />
        </>
    );
};
