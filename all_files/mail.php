<?
function inputH($str) {
  return htmlspecialchars($str);
}

if (inputH($_POST['email']) != 'undefined') {
  $mail = "
  <tr>
<td align=right valign=top><strong>E-mail:</strong></td>
<td>".inputH($_POST['email'])."</td>
</tr>"; 
}

if (inputH($_POST['phone']) != 'undefined') {
  $phone = "
  <tr>
<td align=right valign=top><strong>Телефон:</strong></td>
<td>".inputH($_POST['phone'])."</td>
</tr>"; 
}

if (inputH($_POST['question']) != 'undefined') {
  $question = "
  <tr>
<td align=right valign=top><strong>Вопрос:</strong></td>
<td>".inputH($_POST['question'])."</td>
</tr>"; 
}


if(inputH($_POST['agreement']) == 'true') {
  $agreement = "Есть";
}
else {
  $agreement = "Нет";
}



$message = "Заявка отправлена ".date("j.m.Y H:i:s",time())." <br>
со страницы <br> <a href='http://www.tehnoprogress.ru/landings/sout/spetsotsenka1/'>http://www.tehnoprogress.ru/landings/sout/spetsotsenka1/</a>
<table cellpadding=3 cellspacing=0>
<tbody>
<tr>
<td align=right valign=top><strong>Форма:</strong></td>
<td>".inputH($_POST['title'])."</td>
</tr>
<tr>
<td align=right valign=top><strong>Имя:</strong></td>
<td>".inputH($_POST['name'])."</td>
</tr>
<tr>".
$phone.
$mail.
$question.
"<tr>
<td align=right valign=top><strong>Согласие на обработку личных данных:</strong></td>
<td>".$agreement."</td>
</tr></tbody>
</table>";




$header = 'From: ruspromgroup.ru' . "\r\n";
$header .= 'Content-Type: text/HTML; charset=utf-8' ."\n";
$tema = "Запрос на консультацию эксперта.";
mail('info@tpcorp.ru', $tema, $message, $header);
mail('krubcova@tpcorp.ru', $tema, $message, $header);


?>
