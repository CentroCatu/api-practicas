SELECT 
`CasoDePrueba`.`id`, `CasoDePrueba`.`titulo`, `CasoDePrueba`.`descripcion`, `CasoDePrueba`.`precondicion`, `CasoDePrueba`.`datos_de_prueba` AS `datosDePrueba`, 
`CasoDePrueba`.`resultado_esperado` AS `resultadoEsperado`, 
`CasoDePrueba`.`resultado_obtenido` AS `resultadoObtenido`, 
`CasoDePrueba`.`tiempo_de_ejecucion` AS `tiempoDeEjecucion`, 
`CasoDePrueba`.`suite_id`, `CasoDePrueba`.`estado_id`, `suite`.`id` AS `suite.id`, 
`suite`.`descripcion` AS `suite.descripcion`, 
`estado`.`id` AS `estado.id`, 
`estado`.`descripcion` AS `estado.descripcion` 
FROM `Caso_de_prueba` AS `CasoDePrueba` 
LEFT OUTER JOIN `Suite` AS `suite` 
ON `CasoDePrueba`.`suite_id` = `suite`.`id` 
LEFT OUTER JOIN `estado` AS `estado` 
ON `CasoDePrueba`.`estado_id` = `estado`.`id`