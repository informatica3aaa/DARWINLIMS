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


  /****** QUOTACION ******/
SELECT TOP (1000) [id]
      ,[user_id]
      ,[active]
      ,[quotation_number]
      ,[start_date]
      ,[expiration_date]
      ,[company_id]
      ,[estimated_days]
      ,[project_id]
      ,[parent_id]
      ,[version]
      ,[state_id]
      ,[currency_id]
      ,[specific_condition]
      ,[general_condition_id]
      ,[user_creator_id]
      ,[user_modifier_id]
      ,[created]
      ,[modified]
      ,[adjunto]
      ,[for]
      ,[quotation_comment]
      ,[quotation_state_id]
      ,[ap_ventas]
      ,[ap_prod]
      ,[ap_ven_user_id]
      ,[ap_prod_user_id]
      ,[reject_comment]
      ,[reject_user_id]
      ,[ap_ven_date]
      ,[ap_prod_date]
  FROM [lims01].[dbo].[quotations]