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


/****** cotizaciones ******/
SELECT quo.[id]
      ,quo.[user_id]
	  ,us.[username]
      ,quo.[active]
      ,quo.[quotation_number]
      ,quo.[start_date]
      ,quo.[expiration_date]
      ,quo.[company_id]
      ,quo.[estimated_days]
      ,quo.[project_id]
      ,quo.[parent_id]
      ,quo.[version]
      ,quo.[state_id]
	  ,st.[name]
      ,quo.[currency_id]
	  ,cu.[name]
      ,quo.[specific_condition]
      ,quo.[general_condition_id]
      ,gc.[paragraph_1] 
      ,gc.[paragraph_2]             
      ,gc.[paragraph_3]
      ,gc.[paragraph_4]
      ,gc.[title]
      ,quo.[user_creator_id]
	         ,us1.[name] + ' ' + us1.[lastname_f] + ' ' + us1[lastname_m]  as user_creator
      ,quo.[user_modifier_id]
	  ,us2.[username] as user_modifier
      ,quo.[created]
      ,quo.[modified]
      ,quo.[adjunto]
      ,quo.[for]
      ,quo.[quotation_comment]
      ,quo.[quotation_state_id]
	  ,qs.[name]
      ,qs.[quotation_class]
      ,qs.[description]
      ,quo.[ap_ventas]
      ,quo.[ap_prod]
      ,quo.[ap_ven_user_id]
	  ,us4.[username] as ap_ven_user
      ,quo.[ap_prod_user_id]
	  ,us5.[username] as ap_prod_user
      ,quo.[reject_comment]
      ,quo.[reject_user_id]
	  ,us3.[username] as reject_user
      ,quo.[ap_ven_date]
      ,quo.[ap_prod_date]
  FROM [quotations] quo 
  INNER JOIN users us  ON quo.id = us.id 
  INNER JOIN states st ON quo.state_id = st.id
  INNER JOIN currencies cu ON quo.currency_id = cu.id
  INNER JOIN general_conditions gc ON quo.general_condition_id = gc.id
  INNER JOIN users us1  ON quo.user_creator_id = us1.id
  LEFT JOIN users us2  ON quo.user_modifier_id = us2.id
  LEFT JOIN users us3  ON quo.reject_user_id = us3.id
  LEFT JOIN users us4  ON quo.ap_ven_user_id = us4.id
  LEFT JOIN users us5  ON quo.ap_prod_user_id = us5.id
  INNER JOIN quotation_states qs ON quo.quotation_state_id = qs.id