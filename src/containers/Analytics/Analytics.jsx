import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import LatestVideoCard from "../../components/LatestVideoCard";
import TabPanel from "../../components/TabPanel";
import Map from "../../components/Map";
import Connection from "../../components/Connection";
import VpnConnections from "../../components/VpnConnection";
import OverviewCharts from "./OverviewCharts";
import RealTimeCard from "./RealtimeCard";
import AllConnection from "./ConnectionAll";
import AllConnectionVpn from "./ConnectionAllVpn";
import data from '../../api/data'
import axios from "axios";

function Analytics() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [eventData, setEventData] = useState([]);



    useEffect(() => {
        setInterval(async () => {
          try {
            const res = await data.get("/ip/fire-wall/connection");
            const eventData = res.data.data;

            const extractedDataArray = eventData.map((event) => {
            const { country, city,  timeout, protocol } = event;
            const srcAddress = event["src-address"];
            return { country, city, srcAddress, timeout, protocol };
            });

            setEventData(eventData);

      // Make a POST request for each extracted data object
            extractedDataArray.forEach(async (extractedData) => {
            try {
            await axios.post("http://localhost:5000/save-connections", { eventData: extractedData });
            } catch (error) {
             console.error("Error saving data:", error);
            }
            });
          } catch (error) {
            console.log(error);
          }
        }, 5000);
      }, []);
      



    const countryCodes = {
        'AF': 'Afghanistan',
        'AX': 'Åland Islands',
        'AL': 'Albania',
        'DZ': 'Algeria',
        'AS': 'American Samoa',
        'AD': 'Andorra',
        'AO': 'Angola',
        'AI': 'Anguilla',
        'AQ': 'Antarctica',
        'AG': 'Antigua and Barbuda',
        'AR': 'Argentina',
        'AM': 'Armenia',
        'AW': 'Aruba',
        'AU': 'Australia',
        'AT': 'Austria',
        'AZ': 'Azerbaijan',
        'BS': 'Bahamas',
        'BH': 'Bahrain',
        'BD': 'Bangladesh',
        'BB': 'Barbados',
        'BY': 'Belarus',
        'BE': 'Belgium',
        'BZ': 'Belize',
        'BJ': 'Benin',
        'BM': 'Bermuda',
        'BT': 'Bhutan',
        'BO': 'Bolivia',
        'BQ': 'Bonaire, Sint Eustatius and Saba',
        'BA': 'Bosnia and Herzegovina',
        'BW': 'Botswana',
        'BV': 'Bouvet Island',
        'BR': 'Brazil',
        'IO': 'British Indian Ocean Territory',
        'BN': 'Brunei Darussalam',
        'BG': 'Bulgaria',
        'BF': 'Burkina Faso',
        'BI': 'Burundi',
        'CV': 'Cabo Verde',
        'KH': 'Cambodia',
        'CM': 'Cameroon',
        'CA': 'Canada',
        'KY': 'Cayman Islands',
        'CF': 'Central African Republic',
        'TD': 'Chad',
        'CL': 'Chile',
        'CN': 'China',
        'CX': 'Christmas Island',
        'CC': 'Cocos (Keeling) Islands',
        'CO': 'Colombia',
        'KM': 'Comoros',
        'CG': 'Congo',
        'CD': 'Congo, Democratic Republic of the',
        'CK': 'Cook Islands',
        'CR': 'Costa Rica',
        'CI': "Côte d'Ivoire",
        'HR': 'Croatia',
        'CU': 'Cuba',
        'CW': 'Curaçao',
        'CY': 'Cyprus',
        'CZ': 'Czech Republic',
        'DK': 'Denmark',
        'DJ': 'Djibouti',
        'DM': 'Dominica',
        'DO': 'Dominican Republic',
        'EC': 'Ecuador',
        'EG': 'Egypt',
        'SV': 'El Salvador',
        'GQ': 'Equatorial Guinea',
        'ER': 'Eritrea',
        'EE': 'Estonia',
        'ET': 'Ethiopia',
        'FK': 'Falkland Islands (Malvinas)',
        'FO': 'Faroe Islands',
        'FJ': 'Fiji',
        'FI': 'Finland',
        'FR': 'France',
        'GF': 'French Guiana',
        'PF': 'French Polynesia',
        'TF': 'French Southern Territories',
        'GA': 'Gabon',
        'GM': 'Gambia',
        'GE': 'Georgia',
        'DE': 'Germany',
        'GH': 'Ghana',
        'GI': 'Gibraltar',
        'GR': 'Greece',
        'GL': 'Greenland',
        'GD': 'Grenada',
        'GP': 'Guadeloupe',
        'GU': 'Guam',
        'GT': 'Guatemala',
        'GG': 'Guernsey',
        'GN': 'Guinea',
        'GW': 'Guinea-Bissau',
        'GY': 'Guyana',
        'HT': 'Haiti',
        'HM': 'Heard Island and McDonald Islands',
        'VA': 'Holy See',
        'HN': 'Honduras',
        'HK': 'Hong Kong',
        'HU': 'Hungary',
        'IS': 'Iceland',
        'IN': 'India',
        'ID': 'Indonesia',
        'IR': 'Iran, Islamic Republic of',
        'IQ': 'Iraq',
        'IE': 'Ireland',
        'IM': 'Isle of Man',
        'IL': 'Israel',
        'IT': 'Italy',
        'JM': 'Jamaica',
        'JP': 'Japan',
        'JE': 'Jersey',
        'JO': 'Jordan',
        'KZ': 'Kazakhstan',
        'KE': 'Kenya',
        'KI': 'Kiribati',
        'KP': "Korea, Democratic People's Republic of",
        'KR': 'Korea, Republic of',
        'KW': 'Kuwait',
        'KG': 'Kyrgyzstan',
        'LA': "Lao People's Democratic Republic",
        'LV': 'Latvia',
        'LB': 'Lebanon',
        'LS': 'Lesotho',
        'LR': 'Liberia',
        'LY': 'Libya',
        'LI': 'Liechtenstein',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'MO': 'Macao',
        'MK': 'North Macedonia',
        'MG': 'Madagascar',
        'MW': 'Malawi',
        'MY': 'Malaysia',
        'MV': 'Maldives',
        'ML': 'Mali',
        'MT': 'Malta',
        'MH': 'Marshall Islands',
        'MQ': 'Martinique',
        'MR': 'Mauritania',
        'MU': 'Mauritius',
        'YT': 'Mayotte',
        'MX': 'Mexico',
        'FM': 'Micronesia, Federated States of',
        'MD': 'Moldova, Republic of',
        'MC': 'Monaco',
        'MN': 'Mongolia',
        'ME': 'Montenegro',
        'MS': 'Montserrat',
        'MA': 'Morocco',
        'MZ': 'Mozambique',
        'MM': 'Myanmar',
        'NA': 'Namibia',
        'NR': 'Nauru',
        'NP': 'Nepal',
        'NL': 'Netherlands',
        'NC': 'New Caledonia',
        'NZ': 'New Zealand',
        'NI': 'Nicaragua',
        'NE': 'Niger',
        'NG': 'Nigeria',
        'NU': 'Niue',
        'NF': 'Norfolk Island',
        'MP': 'Northern Mariana Islands',
        'NO': 'Norway',
        'OM': 'Oman',
        'PK': 'Pakistan',
        'PW': 'Palau',
        'PS': 'Palestine, State of',
        'PA': 'Panama',
        'PG': 'Papua New Guinea',
        'PY': 'Paraguay',
        'PE': 'Peru',
        'PH': 'Philippines',
        'PN': 'Pitcairn',
        'PL': 'Poland',
        'PT': 'Portugal',
        'PR': 'Puerto Rico',
        'QA': 'Qatar',
        'RE': 'Réunion',
        'RO': 'Romania',
        'RU': 'Russian Federation',
        'RW': 'Rwanda',
        'BL': 'Saint Barthélemy',
        'SH': 'Saint Helena, Ascension and Tristan da Cunha',
        'KN': 'Saint Kitts and Nevis',
        'LC': 'Saint Lucia',
        'MF': 'Saint Martin (French part)',
        'PM': 'Saint Pierre and Miquelon',
        'VC': 'Saint Vincent and the Grenadines',
        'WS': 'Samoa',
        'SM': 'San Marino',
        'ST': 'Sao Tome and Principe',
        'SA': 'Saudi Arabia',
        'SN': 'Senegal',
        'RS': 'Serbia',
        'SC': 'Seychelles',
        'SL': 'Sierra Leone',
        'SG': 'Singapore',
        'SX': 'Sint Maarten (Dutch part)',
        'SK': 'Slovakia',
        'SI': 'Slovenia',
        'SB': 'Solomon Islands',
        'SO': 'Somalia',
        'ZA': 'South Africa',
        'GS': 'South Georgia and the South Sandwich Islands',
        'SS': 'South Sudan',
        'ES': 'Spain',
        'LK': 'Sri Lanka',
        'SD': 'Sudan',
        'SR': 'Suriname',
        'SJ': 'Svalbard and Jan Mayen',
        'SZ': 'Eswatini',
        'SE': 'Sweden',
        'CH': 'Switzerland',
        'SY': 'Syrian Arab Republic',
        'TW': 'Taiwan, Province of China',
        'TJ': 'Tajikistan',
        'TZ': 'Tanzania, United Republic of',
        'TH': 'Thailand',
        'TL': 'Timor-Leste',
        'TG': 'Togo',
        'TK': 'Tokelau',
        'TO': 'Tonga',
        'TT': 'Trinidad and Tobago',
        'TN': 'Tunisia',
        'TR': 'Turkey',
        'TM': 'Turkmenistan',
        'TC': 'Turks and Caicos Islands',
        'TV': 'Tuvalu',
        'UG': 'Uganda',
        'UA': 'Ukraine',
        'AE': 'United Arab Emirates',
        'GB': 'United Kingdom',
        'US': 'United States',
        'UM': 'United States Minor Outlying Islands',
        'UY': 'Uruguay',
        'UZ': 'Uzbekistan',
        'VU': 'Vanuatu',
        'VE': 'Venezuela, Bolivarian Republic of',
        'VN': 'Viet Nam',
        'VG': 'Virgin Islands, British',
        'VI': 'Virgin Islands, U.S.',
        'WF': 'Wallis and Futuna',
        'EH': 'Western Sahara',
        'YE': 'Yemen',
        'ZM': 'Zambia',
        'ZW': 'Zimbabwe'
      };
      
      const countryCodesLow = {
        AF: 'af',
        AL: 'al',
        DZ: 'dz',
        AS: 'as',
        AD: 'ad',
        AO: 'ao',
        AI: 'ai',
        AQ: 'aq',
        AG: 'ag',
        AR: 'ar',
        AM: 'am',
        AW: 'aw',
        AU: 'au',
        AT: 'at',
        AZ: 'az',
        BS: 'bs',
        BH: 'bh',
        BD: 'bd',
        BB: 'bb',
        BY: 'by',
        BE: 'be',
        BZ: 'bz',
        BJ: 'bj',
        BM: 'bm',
        BT: 'bt',
        BO: 'bo',
        BA: 'ba',
        BW: 'bw',
        BV: 'bv',
        BR: 'br',
        IO: 'io',
        BN: 'bn',
        BG: 'bg',
        BF: 'bf',
        BI: 'bi',
        KH: 'kh',
        CM: 'cm',
        CA: 'ca',
        CV: 'cv',
        KY: 'ky',
        CF: 'cf',
        TD: 'td',
        CL: 'cl',
        CN: 'cn',
        CX: 'cx',
        CC: 'cc',
        CO: 'co',
        KM: 'km',
        CG: 'cg',
        CD: 'cd',
        CK: 'ck',
        CR: 'cr',
        CI: 'ci',
        HR: 'hr',
        CU: 'cu',
        CY: 'cy',
        CZ: 'cz',
        DK: 'dk',
        DJ: 'dj',
        DM: 'dm',
        DO: 'do',
        EC: 'ec',
        EG: 'eg',
        SV: 'sv',
        GQ: 'gq',
        ER: 'er',
        EE: 'ee',
        ET: 'et',
        FK: 'fk',
        FO: 'fo',
        FJ: 'fj',
        FI: 'fi',
        FR: 'fr',
        GF: 'gf',
        PF: 'pf',
        TF: 'tf',
        GA: 'ga',
        GM: 'gm',
        GE: 'ge',
        DE: 'de',
        GH: 'gh',
        GI: 'gi',
        GR: 'gr',
        GL: 'gl',
        GD: 'gd',
        GP: 'gp',
        GU: 'gu',
        GT: 'gt',
        GN: 'gn',
        GW: 'gw',
        GY: 'gy',
        HT: 'ht',
        HM: 'hm',
        VA: 'va',
        HN: 'hn',
        HK: 'hk',
        HU: 'hu',
        IS: 'is',
        IN: 'in',
        ID: 'id',
        IR: 'ir',
        IQ: 'iq',
        IE: 'ie',
        IL: 'il',
        IT: 'it',
        JM: 'jm',
        JP: 'jp',
        JO: 'jo',
        KZ: 'kz',
        KE: 'ke',
        KI: 'ki',
        KP: 'kp',
        KR: 'kr',
        KW: 'kw',
        KG: 'kg',
        LA: 'la',
        LV: 'lv',
        LB: 'lb',
        LS: 'ls',
        LR: 'lr',
        LY: 'ly',
        LI: 'li',
        LT: 'lt',
        LU: 'lu',
        MO: 'mo',
        MK: 'mk',
        MG: 'mg',
        MW: 'mw',
        MY: 'my',
        MV: 'mv',
        ML: 'ml',
        MT: 'mt',
        MH: 'mh',
        MQ: 'mq',
        MR: 'mr',
        MU: 'mu',
        YT: 'yt',
        MX: 'mx',
        FM: 'fm',
        MD: 'md',
        MC: 'mc',
        MN: 'mn',
        MS: 'ms',
        MA: 'ma',
        MZ: 'mz',
        MM: 'mm',
        NA: 'na',
        NR: 'nr',
        NP: 'np',
        NL: 'nl',
        AN: 'an',
        NC: 'nc',
        NZ: 'nz',
        NI: 'ni',
        NE: 'ne',
        NG: 'ng',
        NU: 'nu',
        NF: 'nf',
        MP: 'mp',
        NO: 'no',
        OM: 'om',
        PK: 'pk',
        PW: 'pw',
        PS: 'ps',
        PA: 'pa',
        PG: 'pg',
        PY: 'py',
        PE: 'pe',
        PH: 'ph',
        PN: 'pn',
        PL: 'pl',
        PT: 'pt',
        PR: 'pr',
        QA: 'qa',
        RE: 're',
        RO: 'ro',
        RU: 'ru',
        RW: 'rw',
        SH: 'sh',
        KN: 'kn',
        LC: 'lc',
        PM: 'pm',
        VC: 'vc',
        WS: 'ws',
        SM: 'sm',
        ST: 'st',
        SA: 'sa',
        SN: 'sn',
        SC: 'sc',
        SL: 'sl',
        SG: 'sg',
        SK: 'sk',
        SI: 'si',
        SB: 'sb',
        SO: 'so',
        ZA: 'za',
        GS: 'gs',
        ES: 'es',
        LK: 'lk',
        SD: 'sd',
        SR: 'sr',
        SJ: 'sj',
        SZ: 'sz',
        SE: 'se',
        CH: 'ch',
        SY: 'sy',
        TW: 'tw',
        TJ: 'tj',
        TZ: 'tz',
        TH: 'th',
        TG: 'tg',
        TK: 'tk',
        TO: 'to',
        TT: 'tt',
        TN: 'tn',
        TR: 'tr',
        TM: 'tm',
        TC: 'tc',
        TV: 'tv',
        UG: 'ug',
        UA: 'ua',
        AE: 'ae',
        GB: 'gb',
        US: 'us',
        UM: 'um',
        UY: 'uy',
        UZ: 'uz',
        VU: 'vu',
        VE: 've',
        VN: 'vn',
        VG: 'vg',
        VI: 'vi',
        WF: 'wf',
        EH: 'eh',
        YE: 'ye',
        ZM: 'zm',
        ZW: 'zw',
      };
    

    return <Box>
        <Typography sx={styles.pageTitle} variant="h5">Dashboard</Typography>
        <Box sx={styles.tabHeader}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" id='tab-0' />
                <Tab label="Connection Log" id='tab-1' />
                <Tab label="VPN Connection Log" id='tab-2' />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{}}>
            <Box >
                <Box sx={styles.statsContainer}>
                    <Map eventData={eventData} country={countryCodes} countryLow={countryCodesLow}/>
                </Box>

            </Box>
            <Box sx={styles.tableContainer} >
                    <Connection country={countryCodes} countryLow={countryCodesLow} />
            </Box>
            <Box sx={styles.tableContainer} >
                    <VpnConnections />
            </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AllConnection country={countryCodes} countryLow={countryCodesLow}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Typography><AllConnectionVpn /></Typography>
        </TabPanel>

    </Box>;
}

export default Analytics;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    pageTitle: {
        mb: 2
    },
    tabHeader: {
        borderBottom: 1,
        borderColor: 'divider'
    },
    overviewContainer: {
        display: 'grid',
        gridTemplateColumns: { 'md': '1fr', 'lg': '1fr 300px' },
        gap: 2,
        justifyContent: 'center',
    },
    statsContainer: {
        bgcolor: 'neutral.light',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mb: 4
    },
    divider: {
        my:4
    },
    tableContainer: {
        mb:4
    },
    

}
