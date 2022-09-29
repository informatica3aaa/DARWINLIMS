/****** Script for SelectTopNRows command from SSMS  ******/
SELECT ad.[id],
      ,ad.[address_street]
      ,ad.[address_number]
      ,ad.[observations]
      ,ad.[primary_email]
      ,ad.[secondary_email]
      ,ad.[primary_phone]
      ,ad.[secondary_phone]
      ,ad.[active]
      ,ad.[created]
      ,ad.[modified]
      ,com.[id] as id_comuna
      ,com.[name] as comuna
      ,pa.[id] as id_pais
      ,pa.[name] as pais
      ,adt.[id] as id_tipo_direccion
      ,adt.[name] as tipo_direccion
      ,ad.user_creator_id
      ,us.[username] as creator_user
      ad.user_modifier_id
      ,us2.[username] as modifier_user   
  FROM [addresses] ad INNER JOIN
  communes com ON ad.commune_id = com.id INNER JOIN 
  [countries] pa ON ad.country_id = pa.id INNER JOIN
  [address_types] adt ON ad.address_type_id = adt.id INNER JOIN 
  [users] us ON ad.user_creator_id = us.id INNER JOIN 
  [users] us2 ON ad.user_modifier_id = us2.id 
  order by company_id desc