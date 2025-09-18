import requests
from bs4 import BeautifulSoup
import re
import json

url = "https://nagaokait.com/member/member/"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

members = []
counter = 1

for item in soup.select("div.member-item"):
    company = item.select_one("h3.member-title")
    name = item.select_one("p.member-name")
    desc = item.select_one("div.member-desc")
    link_tag = item.select_one("a")
    link = link_tag["href"] if link_tag else ""

    company_text = company.get_text(strip=True) if company else ""
    name_text = name.get_text(strip=True).replace("代表者：", "") if name else ""
    desc_text = desc.get_text(strip=True) if desc else ""

    # expertiseAreas を「、」「／」「/」で分割
    expertiseAreas = [x.strip() for x in re.split("[、／/]", desc_text) if x.strip()]

    members.append({
        "id": f"member_{counter:03}",
        "name": name_text,
        "company": company_text,
        "contactUrl": link,
        "expertiseAreas": expertiseAreas
    })
    counter += 1

with open("members.json", "w", encoding="utf-8") as f:
    json.dump(members, f, ensure_ascii=False, indent=2)

print("members.json を出力しました")
