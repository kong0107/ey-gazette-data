# ey-gazette-data
行政院公報備份

敬請瀏覽 https://kong0107.github.io/ey-gazette

## Data Source
[行政院公報資訊網](http://gazette.nat.gov.tw/egFront/OpenData/help.jsp)

僅保留 XML 檔，而不含 PDF 檔，但本庫仍逾 5GB 。		
如欲自行從行政院公報資訊網下載（包含 PDF 檔），可考慮使用 [ey-gazette](https://github.com/kong0107/ey-gazette) 。

## Directory Structure
`YYY/YYY-mm-dd/YYY-mm-dd.xml`	
其中 `YYY` 為民國紀年，未滿100時補零。	
若保留原始資料檔的 PDF 檔，即存於每個 `YYY/YYY-mm-dd` 目錄中。

## License
提供機關／行政院公報資訊網	
此開放資料依政府資料開放授權條款 (Open Government Data License) 進行公眾釋出，使用者於遵守本條款各項規定之前提下，得利用之。	
政府資料開放授權條款：http://data.gov.tw/license

Data Providing Organization/The Executive Yuan Gazette	
The Open Data is made available to the public under the Open Government Data License, User can make use of it when complying to the condition and obligation of its terms.	
Open Government Data License:http://data.gov.tw/license
