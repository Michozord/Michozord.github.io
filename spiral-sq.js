function isPrime(num) 
{
	if (num === 1 || num === 0 )
	{
		return false;
	}
	else if (num === 2)
	{
		return true; 
	}
	var s=Math.ceil(Math.sqrt(num));
	for(var i = 2; i <= s; i++)
	{
		if(num % i === 0) 
		{
			return false;
		}
	}
	return num > 1;
};

function pi (num)
{
	if(num == 1)
	{
		return 0;
	}
	else 
	{
		var result = num/Math.log(num);
		result *= 1.225;
		return result;
	}
};


function checkErrors()
{
	var spiralStart = document.getElementById("spiral_start").value;
	var spiralEnd = document.getElementById("spiral_end").value; 
	var showingValues = document.getElementById("show_values").value;
		
	if (spiralStart < 0 || isNaN(spiralStart) === true || spiralStart != Math.floor(spiralStart) )
	{
		document.getElementById("alert").innerHTML = "Wartość początkowa musi być liczbą naturalną";
		error=true;
	}
	if (spiralEnd < 0 || isNaN(spiralEnd) === true || spiralEnd != Math.floor(spiralEnd))
	{
		document.getElementById("alert").innerHTML = "Wartość końcowa musi być liczbą naturalną";
		error=true;
	}
	if (spiralStart - spiralEnd >= 0 )
	{
		document.getElementById("alert").innerHTML = "Wartość końcowa musi być większa od wartości początkowej ";
		error=true;
	}
	if (spiralEnd - spiralStart >= 1000000 )
	{
		document.getElementById("alert").innerHTML = "Wybrano zbyt duży zakres liczb. Maksymalna liczba elementów w spirali to 1 000 000";
		error=true;
	}
	if (spiralEnd - spiralStart >= 1000 && showingValues == 1)
	{
		document.getElementById("alert").innerHTML = "Przy liczbie elementów spirali przekraczającej 1000 opcja pokazywania etykiet liczb nie daje zadowalających efektów, więc jest niedostępna";
	}
};

function reset () 
{
	error = false; 
	document.getElementById("alert").innerHTML = " ";
};


var error = false;
var pageSize = 1000; //rozmiar calego pola
var background = false; 

function clearCanvas()
{
	var c = document.getElementById("spiralOut");
	var ctx = c.getContext("2d");
	ctx.clearRect ( 0 , 0 , pageSize , pageSize );	
	background = false; 
};

function generateSpiral()
{
	function generateSS()
	{
		var c = document.getElementById("spiralOut");
		var ctx = c.getContext("2d");
		ctx.fill();
		
		if(choosenSize != 0) //rozmiar punktu 
		{
			ptSize = step/5*choosenSize;
		} else 
		{
			ptSize = Math.pow(step, 0.9); 
		};
		
		if (direction == 2) //korygowanie pozycji pierwszego elementu
		{
			x=x+step;
		} else if (direction == 3) 
		{
			x=x+step;
			y=y-step;
		}else if (direction == 4)
		{
			y=y-step;
		};
		
		//var currentSide - długosc obecnego boku spirali, liczba krokow, jakie nalezy wykonac na tym boku 
		for (var currentSide = 0; currentSide < numberOfSides; currentSide++)
		{
			for (var j = 0; j<2; j++)
			{
				for (var i = 0; i<currentSide; i++)
				{
					if (isPrime(n) === true) //rysowanie punktow w odpowiednich kolorach 
					{
						ctx.fillStyle = primeStyle;
						ctx.fillRect(x-(ptSize/2),y-(ptSize/2),ptSize,ptSize, ptSize);
					}
					else if (drawingComposites === true)
					{
						ctx.fillStyle = compositeStyle;
						ctx.fillRect(x-(ptSize/2),y-(ptSize/2),ptSize,ptSize, ptSize);
					}
					if (showingValues === true){
						ctx.fillStyle = textStyle; //wstawianie wartosci liczb
						ctx.font = textSize; 
						ctx.fillText(n,x-(ptSize/5), y+(ptSize/8));
					}
					if(direction === 1)
					{
						x-=step;
					}else if (direction === 2)
					{
						y+=step;
					}else if (direction === 3)
					{
						x+=step;
					}else if (direction === 4)
					{
						y-=step;
					}
					n++;
					if(n>spiralEnd-1)
					{
						break;
					}
				}				
				direction++;
				if(direction>4)
				{
					direction=1;
				}				
			}		
		}	
	};
	
	
	function generateSC()
	{
		var c = document.getElementById("spiralOut");
		var ctx = c.getContext("2d");
		var step = (pageSize-100)/(2*Math.sqrt(numberOfElements)); //krok miedzy zwojami spirali 
		var speed = step/(2*Math.PI); //wsp. kier. przyrostu promienia(theta)
		var length = 2*Math.PI*Math.PI*speed; //odstep po spirali miedzy elementami 
		var theta = 0; //kat promienia wiodacego 
		var radius = 0; //aktualna dlugosc promienia wodzacego
		var position = 0; //pozycja od poczatku spirali 
		var currentX; //pozycja x aktualnego punktu 
		var currentY; //pozycja y aktualnego punktu 
		var thetaZero = 0; //kat poczatkowy
		ctx.fill();
		
		if(choosenSize != 0) //rozmiar punktu 
		{
			ptSize = step/5*choosenSize;
		} else 
		{
			ptSize = Math.pow(step, 0.9); 
		};
		
		if (direction == 2) //ustalanie kata poczatkowego
		{
			thetaZero=Math.PI/2;
		} else if (direction == 3) 
		{
			thetaZero=Math.PI;
		}else if (direction == 4)
		{
			thetaZero=3*Math.PI/2;
		};
		
		for (var n = spiralStart; n<=spiralEnd; n++)
		{
			theta = Math.sqrt(2*position/speed);
			radius = speed*theta; 
			currentX = radius*Math.cos(theta+thetaZero)+pageSize/2;
			currentY = radius*Math.sin(theta+thetaZero)+pageSize/2;
			if(isPrime(n) == true)
			{
				ctx.fillStyle=primeStyle;
				ctx.fillRect(currentX-(ptSize/2), currentY-(ptSize/2), ptSize, ptSize, ptSize);				
			}else if (drawingComposites == true) 
			{
				ctx.fillStyle=compositeStyle;	
				ctx.fillRect(currentX-(ptSize/2), currentY-(ptSize/2), ptSize, ptSize, ptSize);				
			};
			if (showingValues == true)
			{
				ctx.fillStyle=textStyle;
				ctx.font = textSize; 
				ctx.fillText(n,currentX-(ptSize/3), currentY+(ptSize/3));
			};
			position += length;
		}
	};

	//POBIERANIE DANYCH WEJSCIOWYCH, USTALENIE WARTOSCI ZMIENNYCH POMOCNICZYCH
	var spiralStart = new Number(document.getElementById("spiral_start").value);
	var spiralEnd = new Number(document.getElementById("spiral_end").value); 
	var numberOfElements = spiralEnd - spiralStart;
	var side = Math.ceil(Math.sqrt(numberOfElements)); // dlugosc boku spirali 
	var numberOfSides = Math.ceil((1+Math.sqrt(1+4*numberOfElements))/2);
	var n = spiralStart;
	var direction = document.getElementById("dir").value; // 1 prawo ; 2 gora ; 3 lewo; 4 dol 
	var step = (pageSize-100)/side; //dlugosc jednego kroku 
	var x = (pageSize/2)-(step/2);
	var y = (pageSize/2)+(step/2);
	var choosenSize = document.getElementById("point_size").value;
	var typeOfSpiral = document.getElementById("type").value;
	var ptSize;  //tymczosowo - do wywalenia przypisywanie wartosci
	 
	//korygowanie początkowego polozenia w zaleznosci od wybranego kierunku 
	if (direction == 2)
	{
		x=x+step;
	} else if (direction == 3) 
	{
		x=x+step;
		y=y-step;
	}else if (direction == 4)
	{
		y=y-step;
	}
	
	reset();
	
	var color = document.getElementById("prime_style").value; //import koloru liczb pierwszych i transkrypcja na rgb
	var primeStyle;
	if (color == 1) //bialy 
	{
		primeStyle = "#FFFFFF";
	} else if (color == 2) //czarny
	{
		primeStyle = "#000000";
	} else if (color == 3) //czerwony 
	{
		primeStyle = " #990000";
	}
	else if (color == 4) //zielony
	{
		primeStyle = "#00e673";
	}	
	else if (color == 5) //jasnoszary
	{
		primeStyle = "#BBBBBB";
	}	
	else if (color == 6) //ciemnoszary
	{
		primeStyle = "#222222";
	}
	else if (color == 7) //fioletowy
	{
		primeStyle = " #aa80ff";
	}
	else if (color == 8) //niebieski
	{
		primeStyle = " #6699ff";
	}
	else if (color == 9) //blekitny 
	{
		primeStyle = "#99CCFF";
	}
	else if (color == 10) //mietowy
	{
		primeStyle = "#ccffe6";
	} 
	else if (color == 11) //zolty
	{
		primeStyle = "#FFCC00";
	}
	else if (color == 12) //pomaranczowy
	{
		primeStyle = "#FF5500";
	}
	else if (color == 13) //rozowy
	{
		primeStyle = "#FF6666";
	}
	
	color = document.getElementById("composite_style").value; //import koloru liczb zlozonych i transkrypcja na rgb oraz import zaznaczenia opcji rysowania liczb zlozonych
	var compositeStyle;
	var drawingComposites = false;
	
	if (document.getElementById("show_composite").value == 1)
	{
		drawingComposites = true; 
		if (color == 1) //bialy 
		{
			compositeStyle = "#FFFFFF";
		} else if (color == 2) //czarny
		{
			compositeStyle = "#000000";
		} else if (color == 3) //czerwony 
		{
			compositeStyle = " #990000";
		}
		else if (color == 4) //zielony
		{
			compositeStyle = "#00e673";
		}	
		else if (color == 5) //jasnoszary
		{
			compositeStyle = "#BBBBBB";
		}	
		else if (color == 6) //ciemnoszary
		{
			compositeStyle = "#222222";
		}
		else if (color == 7) //fioletowy
		{
			compositeStyle = " #aa80ff";
		}
		else if (color == 8) //niebieski
		{
			compositeStyle = " #6699ff";
		}
		else if (color == 9) //blekitny 
		{
			compositeStyle = "#99CCFF";
		}
		else if (color == 10) //mietowy
		{
			compositeStyle = "#ccffe6";
		} 
		else if (color == 11) //zolty
		{
			compositeStyle = "#FFCC00";
		}
		else if (color == 12) //pomaranczowy
		{
			compositeStyle = "#FF5500";
		}
		else if (color == 13) //rozowy
		{
			compositeStyle = "#FF6666";
		}		
	}
	
	color = document.getElementById("text_style").value; //import koloru etykiet i transkrypcja na rgb oraz import zaznaczenia opcji rysowania liczb zlozonych
	var textStyle;	
	if (color == 1) //bialy 
	{
		textStyle = "#FFFFFF";
	} else if (color == 2) //czarny
	{
		textStyle = "#000000";
	} else if (color == 3) //czerwony 
	{
		textStyle = " #990000";
	}
	else if (color == 4) //zielony
	{
		textStyle = "#00e673";
	}	
	else if (color == 5) //jasnoszary
	{
		textStyle = "#BBBBBB";
	}	
	else if (color == 6) //ciemnoszary
	{
		textStyle = "#222222";
	}
	else if (color == 7) //fioletowy
	{
		textStyle = " #aa80ff";
	}
	else if (color == 8) //niebieski
	{
		textStyle = " #6699ff";
	}
	else if (color == 9) //blekitny 
	{
		textStyle = "#99CCFF";
	}
	else if (color == 10) //mietowy
	{
		textStyle = "#ccffe6";
	} 
	else if (color == 11) //zolty
	{
		textStyle = "#FFCC00";
	}
	else if (color == 12) //pomaranczowy
	{
		textStyle = "#FF5500";
	}
	else if (color == 13) //rozowy
	{
		textStyle = "#FF6666";
	}
	
	
	var showingValues = false;
	if (document.getElementById("show_values").value == 1 && numberOfElements <= 1000)
	{
		showingValues = true;
	}
	
	var textSize = (pageSize-100)/(4*Math.sqrt(numberOfElements)); //ustalanie rozmiaru czcionki etykiet
	textSize = textSize + "px Arial";
	
	checkErrors();
	
	//WYWOLANIE GENERATE SS LUB GENERATE CS
	if (typeOfSpiral == 2 && error == false )
	{
		makeBackground();
		generateSC();
	}else if (typeOfSpiral == 1 && error == false )
	{
		makeBackground();
		generateSS();
	}
}












function generateRandom()
{
	function generateRandSq ()
	{	
		
		for(var i = 0; i < numberOfNumbers; i++)
		{
			var c = document.getElementById("spiralOut");
			var ctx = c.getContext("2d");
			ctx.fill();
			var posX = Math.floor(Math.random() * Math.floor(side))-side/2;
			var posY = Math.floor(Math.random() * Math.floor(side))-side/2;
			ctx.fillStyle=randomStyle;
			ctx.fillRect(posX*step + startX, posY*step + startY, ptSize, ptSize);
		};
		
	};
	
	
	function generateRandC ()
	{
		var c = document.getElementById("spiralOut");
		var ctx = c.getContext("2d");
		ctx.fill();
		var speed = (pageSize-100)/(4*Math.PI*Math.sqrt(numberOfElements));
		var length = 2*Math.PI*Math.PI*speed;
		ctx.fillStyle=randomStyle;
		var ptSizeC;
		
		if(choosenSize != 0) //rozmiar punktu 
		{
			ptSize = stepC/5*choosenSize;
		} else 
		{
			ptSizeC = Math.pow(stepC, 0.9); 
		};
		
		for(var i = 0; i < numberOfNumbers; i++)
		{
			var pos = Math.floor(Math.random() * numberOfElements)*length;
			var theta = Math.sqrt(2*pos/speed);
			var radius = speed*theta; 
			ctx.fillRect(radius*Math.cos(theta)+(pageSize/2)-(ptSizeC/2), radius*Math.sin(theta)+(pageSize/2)-(ptSizeC/2), ptSizeC, ptSizeC);
			
		};
		
	};
	
	var spiralStart = new Number(document.getElementById("spiral_start").value);
	var spiralEnd = new Number(document.getElementById("spiral_end").value); 
	var choosenSize = document.getElementById("point_size").value;
	var numberOfElements = spiralEnd - spiralStart + 1;	
	var side = Math.ceil(Math.sqrt(numberOfElements)); // dlugosc jednego boku 
	var step = (pageSize-100)/side; //dlugosc jednego kroku 
	var stepC = (pageSize-100)/(2*Math.sqrt(numberOfElements));
	var typeOfSpiral = document.getElementById("type").value;
	
	var color = document.getElementById("random_style").value; //kolor liczb losowych
	var randomStyle;
	if (color == 1) //bialy 
	{
		randomStyle = "#FFFFFF";
	} else if (color == 2) //czarny
	{
		randomStyle = "#000000";
	} else if (color == 3) //czerwony 
	{
		randomStyle = " #990000";
	}
	else if (color == 4) //zielony
	{
		randomStyle = "#00e673";
	}	
	else if (color == 5) //jasnoszary
	{
		randomStyle = "#BBBBBB";
	}	
	else if (color == 6) //ciemnoszary
	{
		randomStyle = "#222222";
	}
	else if (color == 7) //fioletowy
	{
		randomStyle = " #aa80ff";
	}
	else if (color == 8) //niebieski
	{
		randomStyle = " #6699ff";
	}
	else if (color == 9) //blekitny 
	{
		randomStyle = "#99CCFF";
	}
	else if (color == 10) //mietowy
	{
		randomStyle = "#ccffe6";
	} 
	else if (color == 11) //zolty
	{
		randomStyle = "#FFCC00";
	}
	else if (color == 12) //pomaranczowy
	{
		randomStyle = "#FF5500";
	}
	else if (color == 13) //rozowy
	{
		randomStyle = "#FF6666";
	}
	
	var ptSize;
	if(choosenSize != 0) //rozmiar punktu 
	{
		ptSize = step/5*choosenSize;
	} else 
	{
		ptSize = Math.pow(step, 0.9); 
	};

	var numberOfNumbers = pi(spiralEnd) - pi(spiralStart); 
	var startX = (pageSize/2) - 0.5*ptSize + 0.5*step; 
	var startY = (pageSize/2) - 0.5*ptSize + 0.5*step;

	reset();
	
	checkErrors();
	
	if (error == false)
	{
		makeBackground();
		if(typeOfSpiral == 1)
		{
			generateRandSq();
		}else
		{
			generateRandC();
		}
	}
	
	
};





function makeBackground()
{
	var c = document.getElementById("spiralOut");
	var ctx = c.getContext("2d");
	ctx.fill();
	var color = document.getElementById("background_style").value; 
	var bgColor; 
	if(background == false)
	{
		if (color == 1) //bialy 
		{
			bgColor = "#FFFFFF";
		} else if (color == 2) //czarny
		{
			bgColor = "#000000";
		} else if (color == 3) //czerwony 
		{
			bgColor = " #990000";
		}
		else if (color == 4) //zielony
		{
			bgColor = "#00e673";
		}	
		else if (color == 5) //jasnoszary
		{
			bgColor = "#BBBBBB";
		}	
		else if (color == 6) //ciemnoszary
		{
			bgColor = "#222222";
		}
		else if (color == 7) //fioletowy
		{
			bgColor = " #aa80ff";
		}
		else if (color == 8) //niebieski
		{
			bgColor = " #6699ff";
		}
		else if (color == 9) //blekitny 
		{
			bgColor = "#99CCFF";
		}
		else if (color == 10) //mietowy
		{
			bgColor = "#ccffe6";
		} 
		else if (color == 11) //zolty
		{
			bgColor = "#FFCC00";
		}
		else if (color == 12) //pomaranczowy
		{
			bgColor = "#FF5500";
		}
		else if (color == 13) //rozowy
		{
			bgColor = "#FF6666";
		}
		ctx.fillStyle=bgColor;
		ctx.fillRect(0, 0, pageSize, pageSize);
		background=true;
	}
	
};



function downloadCanvas()
{
	var link = document.createElement("a");
	link.download = "ulam_spiral.png";
	link.href = document.getElementById("spiralOut").toDataURL()
	link.click();
};



function showIntroduction() {
	closeInstruction();
	closeBiography();
	document.getElementById("introduction").style.display = "block";
}

function closeIntroduction()
{
	document.getElementById("introduction").style.display = "none"; 
	
}


function showInstruction() {
	closeIntroduction();
	closeBiography();
	document.getElementById("instruction").style.display = "block";
}

function closeInstruction()
{
	document.getElementById("instruction").style.display = "none"; 
}




function showBiography() {
	closeIntroduction();
	closeInstruction();
	document.getElementById("biography").style.display = "block";
}

function closeBiography()
{
	document.getElementById("biography").style.display = "none"; 
}






