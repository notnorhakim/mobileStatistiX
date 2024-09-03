export const categories = {
    "poverty-and-inequality": {
      label: "Poverty & Inequality",
      subCategories: [
        { label: "Poverty headcount ratio at national poverty lines", value: "SI.POV.NAHC" },
        { label: "Urban poverty headcount ratio at national poverty lines", value: "SI.POV.URHC" },
        { label: "Rural poverty headcount ratio at national poverty lines", value: "SI.POV.RUHC" },
        { label: "Poverty gap at national poverty lines", value: "SI.POV.NAGP" },
        { label: "Urban poverty gap at national poverty lines", value: "SI.POV.URGP" },
        { label: "Rural poverty gap at national poverty lines", value: "SI.POV.RUGP" },
        { label: "Poverty headcount ratio at $2.15 a day (2017 PPP)", value: "SI.POV.DDAY" },
        { label: "Poverty headcount ratio at $3.65 a day (2017 PPP)", value: "SI.POV.LMIC" },
        { label: "Poverty headcount ratio at $6.85 a day (2017 PPP)", value: "SI.POV.UMIC" },
        { label: "Poverty gap at $2.15 a day (2017 PPP)", value: "SI.POV.GAPS" },
        { label: "Poverty gap at $3.65 a day (2017 PPP)", value: "SI.POV.LMIC.GP" },
        { label: "Poverty gap at $6.85 a day (2017 PPP)", value: "SI.POV.UMIC.GP" },
        { label: "GINI index (World Bank estimate)", value: "SI.POV.GINI" },
        { label: "Income share held by lowest 10%", value: "SI.DST.FRST.10" },
        { label: "Income share held by lowest 20%", value: "SI.DST.FRST.20" },
        { label: "Income share held by second 20%", value: "SI.DST.02ND.20" },
        { label: "Income share held by third 20%", value: "SI.DST.03RD.20" },
        { label: "Income share held by fourth 20%", value: "SI.DST.04TH.20" },
        { label: "Income share held by highest 20%", value: "SI.DST.05TH.20" },
        { label: "Income share held by highest 10%", value: "SI.DST.10TH.10" },
        { label: "Annualized average growth rate in per capita mean consumption or income", value: "SI.SPR.PCAP.ZG" },
        { label: "Annualized average growth rate in per capita mean consumption or income, bottom 40% of population", value: "SI.SPR.PCAP.40Z" },
        { label: "Income share held by lowest 20%", value: "SI.SPR.PCAP.ZS" },
      ],
    },
    "people": {
    label: "People",
    subCategories: [
      // Population Dynamics
      { label: "Population, total", value: "SP.POP.TOTL" },
      { label: "Population growth (annual %)", value: "SP.POP.GROW" },
      { label: "Birth rate, crude (per 1,000 people)", value: "SP.DYN.CBRT.IN" },
      { label: "Death rate, crude (per 1,000 people)", value: "SP.DYN.CDRT.IN" },
      { label: "Fertility rate, total (births per woman)", value: "SP.DYN.TFRT.IN" },
      { label: "Life expectancy at birth, male (years)", value: "SP.DYN.LE00.MA.IN" },
      { label: "Life expectancy at birth, female (years)", value: "SP.DYN.LE00.FE.IN" },
      { label: "Age dependency ratio, young (% of working-age population)", value: "SP.POP.DPND.YG" },
      { label: "Age dependency ratio, old (% of working-age population)", value: "SP.POP.DPND.OL" },

      // Education
      { label: "Government expenditure on education, total (% of GDP)", value: "SE.XPD.TOTL.GD.ZS" },
      { label: "School enrollment, primary (% gross)", value: "SE.PRM.ENRR" },
      { label: "School enrollment, secondary (% gross)", value: "SE.SEC.ENRR" },
      { label: "School enrollment, tertiary (% gross)", value: "SE.TER.ENRR" },
      { label: "Progression to secondary school (%)", value: "SE.SEC.PROG.ZS" },
      { label: "Primary completion rate, total (% of relevant age group)", value: "SE.PRM.CMPT.ZS" },
      { label: "Literacy rate, youth total (% of people ages 15-24)", value: "SE.ADT.1524.LT.ZS" },

      // Labor
      { label: "Labor force participation rate, total (% of total population ages 15+)", value: "SL.TLF.CACT.ZS" },
      { label: "Employment in agriculture (% of total employment)", value: "SL.AGR.EMPL.ZS" },
      { label: "Employment in industry (% of total employment)", value: "SL.IND.EMPL.ZS" },
      { label: "Employment in services (% of total employment)", value: "SL.SRV.EMPL.ZS" },
      { label: "Employment to population ratio, 15+, total (%)", value: "SL.EMP.TOTL.SP.ZS" },
      { label: "Unemployment, total (% of total labor force)", value: "SL.UEM.TOTL.ZS" },
      { label: "Children in employment, total (% of children ages 7-14)", value: "SL.TLF.0714.ZS" },

      // Health
      { label: "Prevalence of stunting, height for age (% of children under 5)", value: "SH.STA.STNT.ZS" },
      { label: "Maternal mortality ratio (modeled estimate, per 100,000 live births)", value: "SH.STA.MMRT" },
      { label: "Mortality rate, under-5 (per 1,000 live births)", value: "SH.DYN.MORT" },
      { label: "Incidence of HIV (% of uninfected population ages 15-49)", value: "SH.HIV.INCD.ZS" },
      { label: "Mortality from CVD, cancer, diabetes or CRD between exact ages 30 and 70 (%)", value: "SH.DYN.NCOM.ZS" },
      { label: "Mortality caused by road traffic injury (per 100,000 people)", value: "SH.STA.TRAF.P5" },
      { label: "Adolescent fertility rate (births per 1,000 women ages 15-19)", value: "SP.ADO.TFRT" },
      { label: "Proportion of population spending more than 10% of household consumption or income on out-of-pocket health care expenditure (%)", value: "SH.UHC.OOPC.10.ZS" },

      // Gender
      { label: "School enrollment, primary and secondary (gross), gender parity index (GPI)", value: "SE.ENR.PRSC.FM.ZS" },
      { label: "Women who were first married by age 18 (% of women ages 20-24)", value: "SP.M18.2024.FE.ZS" },
      { label: "Demand for family planning satisfied by modern methods (% of married women with demand for family planning)", value: "SH.FPL.SATM.ZS" },
      { label: "Ratio of female to male labor force participation rate (%)", value: "SL.TLF.CACT.FM.ZS" },
      { label: "Female share of employment in senior and middle management (%)", value: "SL.EMP.SMGT.FE.ZS" },
      { label: "Proportion of women subjected to physical and/or sexual violence in the last 12 months (% of women age 15-49)", value: "SG.VAW.1549.ZS" },
      { label: "Proportion of seats held by women in national parliaments (%)", value: "SG.GEN.PARL.ZS" },
    ],
    },
    "environment": {
        label: "Environment",
        subCategories: [
          // Agriculture
          { label: "Agricultural land (% of land area)", value: "AG.LND.AGRI.ZS" },
          { label: "Land under cereal production (hectares)", value: "AG.LND.CREL.HA" },
          { label: "Cereal yield (kg per hectare)", value: "AG.YLD.CREL.KG" },
          { label: "Agriculture, value added per worker (constant 2010 US$)", value: "NV.AGR.EMPL.KD" },
    
          // Climate
          { label: "CO2 emissions (metric tons per capita)", value: "EN.ATM.CO2E.PC" },
          { label: "PM2.5 air pollution, mean annual exposure (micrograms per cubic meter)", value: "EN.ATM.PM25.MC.M3" },
          { label: "PM2.5 air pollution, population exposed to levels exceeding WHO guideline value (% of total)", value: "EN.ATM.PM25.MC.ZS" },
          { label: "Average precipitation in depth (mm per year)", value: "AG.LND.PRCP.MM" },
    
          // Energy & Mining
          { label: "Energy intensity level of primary energy (MJ/$2017 PPP GDP)", value: "EG.EGY.PRIM.PP.KD" },
          { label: "Renewable energy consumption (% of total final energy consumption)", value: "EG.FEC.RNEW.ZS" },
          { label: "Renewable electricity output (% of total electricity output)", value: "EG.ELC.RNEW.ZS" },
          { label: "Access to electricity (% of population)", value: "EG.ELC.ACCS.ZS" },
          { label: "Access to clean fuels and technologies for cooking (% of population)", value: "EG.CFT.ACCS.ZS" },
    
          // Environment
          { label: "Forest area (% of land area)", value: "AG.LND.FRST.ZS" },
          { label: "Total natural resources rents (% of GDP)", value: "NY.GDP.TOTL.RT.ZS" },
          { label: "Terrestrial protected areas (% of total land area)", value: "ER.LND.PTLD.ZS" },
          { label: "Terrestrial and marine protected areas (% of total territorial area)", value: "ER.PTD.TOTL.ZS" },
          { label: "Marine protected areas (% of territorial waters)", value: "ER.MRN.PTMR.ZS" },
    
          // Urban and Rural Development
          { label: "Access to electricity, urban (% of urban population)", value: "EG.ELC.ACCS.UR.ZS" },
          { label: "People using at least basic drinking water services, urban (% of urban population)", value: "SH.H2O.BASW.UR.ZS" },
          { label: "People using at least basic sanitation services, urban (% of urban population)", value: "SH.STA.BASS.UR.ZS" },
          { label: "Access to electricity, rural (% of rural population)", value: "EG.ELC.ACCS.RU.ZS" },
          { label: "People using at least basic sanitation services, rural (% of rural population)", value: "SH.STA.BASS.RU.ZS" },
          { label: "People using at least basic drinking water services, rural (% of rural population)", value: "SH.H2O.BASW.RU.ZS" },
    
          // Water and Sanitation
          { label: "Renewable internal freshwater resources per capita (cubic meters)", value: "ER.H2O.INTR.PC" },
          { label: "Annual freshwater withdrawals, total (% of internal resources)", value: "ER.H2O.FWTL.ZS" },
          { label: "Water productivity, total (constant 2010 US$ GDP per cubic meter of total freshwater withdrawal)", value: "ER.GDP.FWTL.M3.KD" },
          { label: "People using safely managed drinking water services (% of population)", value: "SH.H2O.SMDW.ZS" },
          { label: "People using safely managed sanitation services (% of population)", value: "SH.STA.SMSS.ZS" },
        ],
    },
    "economy": {
    label: "Economy",
    subCategories: [
      // Growth and Economic Structure
      { label: "GDP (current US$)", value: "NY.GDP.MKTP.CD" },
      { label: "GDP growth (annual %)", value: "NY.GDP.MKTP.KD.ZG" },
      { label: "Agriculture, value added (annual % growth)", value: "NV.AGR.TOTL.KD.ZG" },
      { label: "Industry, value added (annual % growth)", value: "NV.IND.TOTL.KD.ZG" },
      { label: "Manufacturing, value added (annual % growth)", value: "NV.IND.MANF.KD.ZG" },
      { label: "Services, value added (annual % growth)", value: "NV.SRV.TOTL.KD.ZG" },
      { label: "Final consumption expenditure (annual % growth)", value: "NE.CON.TOTL.KD.ZG" },
      { label: "Gross capital formation (annual % growth)", value: "NE.GDI.TOTL.KD.ZG" },
      { label: "Exports of goods and services (annual % growth)", value: "NE.EXP.GNFS.KD.ZG" },
      { label: "Imports of goods and services (annual % growth)", value: "NE.IMP.GNFS.KD.ZG" },
      { label: "Agriculture, value added (% of GDP)", value: "NV.AGR.TOTL.ZS" },
      { label: "Industry, value added (% of GDP)", value: "NV.IND.TOTL.ZS" },
      { label: "Services, value added (% of GDP)", value: "NV.SRV.TOTL.ZS" },
      { label: "Final consumption expenditure (% of GDP)", value: "NE.CON.TOTL.ZS" },
      { label: "Gross capital formation (% of GDP)", value: "NE.GDI.TOTL.ZS" },
      { label: "Exports of goods and services (% of GDP)", value: "NE.EXP.GNFS.ZS" },
      { label: "Imports of goods and services (% of GDP)", value: "NE.IMP.GNFS.ZS" },

      // Income and Savings
      { label: "GNI per capita, Atlas method (current US$)", value: "NY.GNP.PCAP.CD" },
      { label: "GNI per capita, PPP (current international $)", value: "NY.GNP.PCAP.PP.CD" },
      { label: "Population, total", value: "SP.POP.TOTL" },
      { label: "Gross savings (% of GDP)", value: "NY.GNS.ICTR.ZS" },
      { label: "Adjusted net savings, including particulate emission damage (% of GNI)", value: "NY.ADJ.SVNG.GN.ZS" },

      // Balance of Payments
      { label: "Export value index (2000 = 100)", value: "TX.VAL.MRCH.XD.WD" },
      { label: "Import value index (2000 = 100)", value: "TM.VAL.MRCH.XD.WD" },
      { label: "Personal remittances, received (% of GDP)", value: "BX.TRF.PWKR.DT.GD.ZS" },
      { label: "Current account balance (% of GDP)", value: "BN.CAB.XOKA.GD.ZS" },
      { label: "Foreign direct investment, net inflows (% of GDP)", value: "BX.KLT.DINV.WD.GD.ZS" },

      // Prices and Terms of Trade
      { label: "Consumer price index (2010 = 100)", value: "FP.CPI.TOTL" },
      { label: "Export unit value index (2000 = 100)", value: "TX.UVI.MRCH.XD.WD" },
      { label: "Import unit value index (2000 = 100)", value: "TM.UVI.MRCH.XD.WD" },
      { label: "Net barter terms of trade index (2000 = 100)", value: "TT.PRI.MRCH.XD.WD" },

      // Labor and Productivity
      { label: "GDP per person employed (constant 2011 PPP $)", value: "SL.GDP.PCAP.EM.KD" },
      { label: "Unemployment, total (% of total labor force) (modeled ILO estimate)", value: "SL.UEM.TOTL.ZS" },
      { label: "Agriculture, value added per worker (constant 2010 US$)", value: "NV.AGR.EMPL.KD" },
      { label: "Industry, value added per worker (constant 2010 US$)", value: "NV.IND.EMPL.KD" },
      { label: "Services, value added per worker (constant 2010 US$)", value: "NV.SRV.EMPL.KD" },
    ],
    },
    "states-and-markets": {
        label: "States & Markets",
        subCategories: [
          // Business Environment
          { label: "Time required to start a business (days)", value: "IC.REG.DURS" },
          { label: "Time required to get electricity (days)", value: "IC.ELC.TIME" },
          { label: "Firms expected to give gifts in meetings with tax officials (% of firms)", value: "IC.TAX.GIFT.ZS" },
          { label: "Firms with female top manager (% of firms)", value: "IC.FRM.FEMM.ZS" },
    
          // Financial Access and Stability
          { label: "Depositors with commercial banks (per 1,000 adults)", value: "FB.CBK.DPTR.P3" },
          { label: "Borrowers from commercial banks (per 1,000 adults)", value: "FB.CBK.BRWR.P3" },
          { label: "Commercial bank branches (per 100,000 adults)", value: "FB.CBK.BRCH.P5" },
          { label: "Bank nonperforming loans to total gross loans (%)", value: "FB.AST.NPER.ZS" },
    
          // Stock Markets
          { label: "Market capitalization of listed domestic companies (% of GDP)", value: "CM.MKT.LCAP.GD.ZS" },
          { label: "Stocks traded, turnover ratio of domestic shares (%)", value: "CM.MKT.TRNR" },
    
          // Government Finance and Taxes
          { label: "Revenue, excluding grants (current LCU)", value: "GC.REV.XGRT.CN" },
          { label: "Expense (current LCU)", value: "GC.XPN.TOTL.CN" },
          { label: "Net lending (+) / net borrowing (-) (current LCU)", value: "GC.NLD.TOTL.CN" },
          { label: "Compensation of employees (current LCU)", value: "GC.XPN.COMP.CN" },
          { label: "Taxes on goods and services (current LCU)", value: "GC.TAX.GSRV.CN" },
          { label: "Profit tax (% of commercial profits)", value: "IC.TAX.PRFT.CP.ZS" },
          { label: "Total tax rate (% of commercial profits)", value: "IC.TAX.TOTL.CP.ZS" },
    
          // Military and Fragile Situations
          { label: "Military expenditure (% of GDP)", value: "MS.MIL.XPND.GD.ZS" },
          { label: "Armed forces personnel, total", value: "MS.MIL.TOTL.P1" },
          { label: "Battle-related deaths (number of people)", value: "VC.BTL.DETH" },
          { label: "Intentional homicides (per 100,000 people)", value: "VC.IHR.PSRC.P5" },
    
          // Infrastructure and Communications
          { label: "Air transport, passengers carried", value: "IS.AIR.PSGR" },
          { label: "Air transport, freight (million ton-km)", value: "IS.AIR.GOOD.MT.K1" },
          { label: "Container port traffic (TEU: 20 foot equivalent units)", value: "IS.SHP.GOOD.TU" },
          { label: "Individuals using the Internet (% of population)", value: "IT.NET.USER.ZS" },
          { label: "Mobile cellular subscriptions (per 100 people)", value: "IT.CEL.SETS.P2" },
          { label: "Investment in transport with private participation (current US$)", value: "IE.PPI.TRAN.CD" },
          { label: "Investment in energy with private participation (current US$)", value: "IE.PPI.ENGY.CD" },
    
          // Science and Innovation
          { label: "Research and development expenditure (% of GDP)", value: "GB.XPD.RSDV.GD.ZS" },
          { label: "Patent applications, residents", value: "IP.PAT.RESD" },
          { label: "Industrial design applications, resident, by count", value: "IP.IDS.RSCT" },
          { label: "Scientific and technical journal articles", value: "IP.JRN.ARTC.SC" },
          { label: "ICT goods exports (% of total goods exports)", value: "TX.VAL.ICTG.ZS.UN" },
        ],
    },
    "global-links": {
        label: "Global Links",
        subCategories: [
          // External Debt
          { label: "External debt stocks, total (DOD, current US$)", value: "DT.DOD.DECT.CD" },
          { label: "External debt stocks, short-term (DOD, current US$)", value: "DT.DOD.DSTC.CD" },
          { label: "External debt stocks, long-term (DOD, current US$)", value: "DT.DOD.DLXF.CD" },
          { label: "External debt stocks, public and publicly guaranteed (PPG) (DOD, current US$)", value: "DT.DOD.DPPG.CD" },
          { label: "External debt stocks, private nonguaranteed (PNG) (DOD, current US$)", value: "DT.DOD.DPNG.CD" },
          { label: "Total debt service (% of exports of goods, services and primary income)", value: "DT.TDS.DECT.EX.ZS" },
    
          // Trade
          { label: "Merchandise trade (% of GDP)", value: "TG.VAL.TOTL.GD.ZS" },
          { label: "Net barter terms of trade index (2000 = 100)", value: "TT.PRI.MRCH.XD.WD" },
    
          // Financial Flows
          { label: "Foreign direct investment, net inflows (BoP, current US$)", value: "BX.KLT.DINV.CD.WD" },
          { label: "Personal remittances, received (current US$)", value: "BX.TRF.PWKR.CD.DT" },
          { label: "Portfolio equity, net inflows (BoP, current US$)", value: "BX.PEF.TOTL.CD.WD" },
    
          // Aid Dependency
          { label: "Net official development assistance and official aid received (current US$)", value: "DT.ODA.ALLD.CD" },
          { label: "Net official development assistance received (current US$)", value: "DT.ODA.ODAT.CD" },
          { label: "Net ODA received (% of GNI)", value: "DT.ODA.ODAT.GN.ZS" },
    
          // Refugees
          { label: "Refugee population by country or territory of asylum", value: "SM.POP.REFG" },
          { label: "Refugee population by country or territory of origin", value: "SM.POP.REFG.OR" },
    
          // Tourism
          { label: "International tourism, receipts (% of total exports)", value: "ST.INT.RCPT.XP.ZS" },
          { label: "International tourism, expenditures (% of total imports)", value: "ST.INT.XPND.MP.ZS" },
    
          // Migration
          { label: "Net migration", value: "SM.POP.NETM" },
        ]
    },
  };
  