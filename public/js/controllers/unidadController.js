/*global angular*/
angular.module('NutrifamiWeb')
        .controller('UnidadController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', 'ngAudio', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, ngAudio) {
                'use strict';
                $anchorScroll();
                var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.usuarioActivo = usuarioActivo;
                $scope.estadoUnidad = 'espera';
                $scope.uids = {};
                $scope.unidades = [];
                $scope.parejas = [];
                
                var tempUnidad = JSON.parse(localStorage.getItem('unidad'));
                var cargarUnidad = true;
                if (tempUnidad !== null) {
                    if (tempUnidad.id === $routeParams.unidad) {
                        cargarUnidad = false;
                    }
                }

                if (cargarUnidad) {

                    try {

                        $scope.uids = nutrifami.training.getUnidadesId($routeParams.leccion);
                        var temp = [];
                        for (var i in $scope.uids) {
                            temp.push($scope.uids[i]);
                        }
                        $scope.unidad = nutrifami.training.getUnidad(temp[$routeParams.unidad - 1]);
                        $scope.unidad.avanceLeccion = (100 / temp.length) * (parseInt($routeParams.unidad) - 1);
                        $scope.unidad.totalUnidades = temp.length;
                        var tempOpciones = [];
                        for (var i in $scope.unidad.opciones) {
                            tempOpciones.push($scope.unidad.opciones[i]);
                        }
                        $scope.unidad.opciones = tempOpciones;


                        if (typeof $scope.unidad.imagen !== 'undefined') {
                            console.log("imagen no definida");
                            if ($scope.unidad.imagen.loaded === "loaded") {
                                $scope.unidad.imagen.mostrar = true;
                            } else {
                                $scope.unidad.imagen.mostrar = false;
                            }
                        }

                        if (typeof $scope.unidad.audio !== 'undefined') {
                            console.log("Audio no definido");
                            if ($scope.unidad.audio.loaded === "loaded") {
                                $scope.unidad.audio.mostrar = true;
                                $scope.unidad.audio.audio = ngAudio.load('data:' + $scope.unidad.audio.ContentType + ';base64,' + $scope.unidad.audio.content);
                            } else {
                                $scope.unidad.audio.mostrar = false;
                            }
                        }
                        
                        console.log($scope.unidad);

                        localStorage.setItem("uids" + $routeParams.leccion, JSON.stringify(temp));
                        localStorage.setItem("unidad", JSON.stringify($scope.unidad));
                    } catch (err) {
                        $location.path('/');
                    }
                } else {
                    $scope.uids = JSON.parse(localStorage.getItem('uids' + $routeParams.leccion));
                    $scope.unidad = JSON.parse(localStorage.getItem('unidad'));
                }

                /*  DATOS DUMMY PARA PROBAR PAREJAS */
                /*var opciones = [
                 {
                 id: 9,
                 correcta: 0,
                 orden: 1,
                 fecha: '',
                 visible: true,
                 texto: 'Texto uno img',
                 audio: {
                 nombre: '',
                 content: Object,
                 loaded: false
                 },
                 media: {
                 ContentType: "image/png",
                 content: "iVBORw0KGgoAAAANSUhEUgAAAyAAAAI/CAMAAAC4WU2gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ↵bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp↵bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6↵eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz↵NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo↵dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw↵dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv↵IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS↵ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD↵cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE↵PSJ4bXAuaWlkOkE5NTgzOEJFNDg0NTExRTY5ODk0QUZGMTE5MjEwNzY5IiB4bXBNTTpEb2N1bWVu↵dElEPSJ4bXAuZGlkOkE5NTgzOEJGNDg0NTExRTY5ODk0QUZGMTE5MjEwNzY5Ij4gPHhtcE1NOkRl↵cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTk1ODM4QkM0ODQ1MTFFNjk4OTRB↵RkYxMTkyMTA3NjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTk1ODM4QkQ0ODQ1MTFFNjk4↵OTRBRkYxMTkyMTA3NjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l↵dGE+IDw/eHBhY2tldCBlbmQ9InIiPz43fn5nAAADAFBMVEXGiFEHCgujUEydcW0ZRWfjvbvt3NjC↵qZLmuJfYq5nv18zSu7nYqoh7SSzAl64nJisWLkzUt6qiLhuFttKAMCTWrKk1bZLbj1FVKyLZvMrf↵183BaCt7Tkjf2tjZmXfDUiryzLvKiWW/eIzHmYjxzsrHmHZWkrXamoeajI/lx6rluYjYqXbamWTK↵inbgeVGeiXDz7eq/VUjnrYfHmprQx8medYnnrZfw6NzBrKfXm6+6eFOlZi/VuJnyyqrJl2N/IRDZ↵m5i2iGPMeVMMHC15am/oq3a6eWa8Z0FRRk23iXfRx7zKiol+ZU47U27WrbujVWa6d0DOeEDlx5eo↵Z0KSlqxtNETMemZqdY/3vbD3u5OmeFfnrancimO9aFQwDAsPERdaHhMOXYeqZ1fKipy2iYitVjQ3↵ia9fPyyfyuG3eXivmZyxmIiUZkG+ub5cpsuWVTPx17vBrLtXDgvci3d7Umb0yJexl3bEp3q7Z2eX↵QzTNenc/ZHu2iZ2UZ1jQZz/ZqGbVt4ixQzOmdkA2eaThz9jAt6mZQx2yQR6GqL+khlVmh56Qd1cy↵HBW3aHulRAbci4jBV2PPaFSuqKjltnbknHTrmmOtVBvmrrutqbt8EAjcaS+ylmWeN0PrnIggERfb↵i5xdobvoqWXz3+LPaWcyWYOVUx7ZeYv0z9Xh17w0gZnRx6rX3ufrnJzKzdaSdUL/4Nv53sxdfKa/↵fKXU6e7PaXzy16rFRRTFhDXXtnZSFCP7r3+EPRGCXTbG2N3cn1D/3LufX4KpuMHvil/M1817GCCh↵fKHviXbb6N51XYe5x8L8z7rsiZ/AZAv8z6r9oY7wiojDXYWbo5fchTyCf3blt2X5lnU4OTj/zsqn↵tqhdXVjh16sTGxn7nbP/16THn1ZiORX96MOoYgn/z9/lz8fnx77lz8/dx77Zz8fnx7bdx8foxsfl↵z77cvq7Zz8/itqbitrHqvrLdx7bqvqHfvqLZz77lz7LutqbqxtHdx9HttrHZz7PM173qw3zYtmfR↵NzAXPn5cjSFTAAUrbklEQVR42oy9f0wbeZYvSmGTurWmKDtr0wWUyTr13Piq29eTa9NdMTzAwfIv↵bEJkCE+eCzgOHgtsy4JFJjR47g2NyTh29+ygK5Ze8ryjfkF7e1phX49W00J4Vx010XSk+eOxlqy2↵LI01jwaP55lk+/W8Vev+s++cMunp6elOtpIQYsAuV53P+Xw+55zvNw1Tzz+IwcFBuVw+ODWVnSou↵LLAMyxaYuw8eHuocXIh1WItWq87K0SzLOsZHHzwcLVrz7kQ5w3K0P5OBR8esC4UQkylNDXpaXx4n↵iKLOWgxxjgWr251LuIvWBesjXbc1P7o1Onp3fHxct5Ev5uiitchMlbLw8qUswzjgNQ6Th4d5a4Fh↵BqVwNiXGnaNDZXfaJ0nn3e50KpVOpw1pdyLhS6TT7t1tw+5uzueL+dm9XNrtc+dyuXKZzoVojg6x↵5RCThbc0OJiFZ68fmcxeZs+Pxzz+7lf6leeV++veD3+9nbJYLDbzeqynp8fr9Y707Cjh6/vB4I6F↵zWYZz31piSjkIlw6R3NuOIqhUKgQKsCJZhiGwcv2woOR4/Ut4ZsdHITL69/by2Qykyxti3l7NJZA↵LJaLxGI7++v7++eDgYXuaFTWZHQ6yROZ0DI3qtvaikYLRInxFEpTRLeK6tJqNZ2vqZ4O264PfJ/S↵X79y+xcX7py/c2fzWgccmubXXmvu++/XLrzjnz84eOf8hTt3+pX99msdmhCRJTx3x4mprPJ244+1↵A0aVyhgWVKqn1OXLqiaVTJhr+WiBndzbm58/WDIvyiouV6VSrVZOTz8+VZ+emgSXSxBk1qxcLr0h↵HSQYIXlyvGaqCivd3Sujo1uPxsaWZiiKj9saGprJmYSEJPmGBo15QuMcMk6Tqs+e8EaTTEZRVICb↵ZDlr/u44M8WOjY1JBBnFay1a+NmZNybMTovFHAiYfauRkZGOkVU6Egl67Y2BxiU/xxBfu6pZhnAs↵SwflpanS1x4tQRzKB+XSwT/63m8c8E3PfgiCv+GPvvQt317HB34lW+AcIYh5Rv6jx48/zXMIEIfV↵mjcYaDpUGLP+aCu6MWrN53O5UMYfYiczfvjmbp1jYYGBH5e/d+MHywTh+DQfCjkWikUrB3HlLi50↵61YAJaNbW6N34dAdHhrcObe1yELwwkuWMo5CAUB3uPEpGc87mNKgVCqVl0pFOpeDi5NAPLgRHAY4↵0vAvPHbTbno3teuLsRl/Ig1fjuzm2FAukgOMlOlCqDTIwDtn4EJ8BZDM3h4iJOOH4PT7WfgUALJz↵pW8k0tOzvr8eC8Z2emKx1ZHVkRig585m0O7lALwFKQCkaIjAq8BpwIm7ObpQYB1soVAqAQ4HSy+C↵R2lKfqP1xqAUoVRiSgw7xkJmyWYn/aFYwOK1W2xeb4TeX9rZAYis++fZ7rm2pFEIO0lF0hTVWbu7↵t6JbBXwauOfE7ImCjGuud/3r9xUKPa96+pTXT0xcuH37DhwXOjrs9ivN1JP/0PdqR/Cddw7g93k4↵+tfX7S+9dMWfLTHSu+ODU9lJ5VsDAwOXn8pkKsEoPCUBKk9lgsI43HJ5Yf7eWx/tHSiVuWSlKqtW↵q0eVyunH759+bDLNCjJFspqHhCaXygEgld+3t6+trZ22AEB0o6OOSWKvUdPcbPY2bJq7uDEu4FRs↵901MXO/iZVXVybuf9ZKyyrHsiNc6J7OTjm6dxyMn4NYoJaTA8116nif1MzO3bvnSOV/A5rNEfKv2↵kZFYLOaFXzaJzTZzlc0SX11UuLeFux6pnGFK37jckOgBIKXn3pI/sIP8jwDyxz8F1xs+lESAyMUv↵ZxwOx1iIKRQBINF0kYNIz+cPIS5zHMdZN7YePtzIw5FjWTEnQxrMZMaAdqyFLEEAQO5DFDjcjhDH↵uq3WhQQwiHvBqtNZgYQePtz60d3RH42ObkR17rQ1X3QU8N1mswXARzGv0x1uGA7DxQKkWym8vZKD↵BoRAyLsTmLcBFKn0GUAQM5FcLu1b3S2z/pBbhIw7VC4Dojiapt1FB4P4gOA9I5ApBAhiBNhjEk4Z↵WGQPeITt95rNI/uYuZXrwZ7Vnpg3NdJwzb7er1xf31xdTRAinwHm075EDl8Ef7nFyxIC0mQymX8P↵QBjm/ps3INMBWoFCGD9dBnzAKfn9Xk2DWRnz6n0xGgJhZzO4E4yNsd3Dc7NhkuedvMtk0jkcCw7d↵aIHIFpbHx6cIwxGp5W2azidPFSpqWiV7qtLzkHqXkEIAIleuXAEK6dL2IUDe6T8QEbL+9rVr114a↵ycCt9ixL5VNE5o23Lv/1ZZVquE0mEzZUAtCISkFNzxj/+vLY3ljLzy9ePVC6Z6smlww4RGZSrz34↵WB3d2JC5qrOCLpspwS1CgLS3q9Vr6o2n3QtAId2ZyXk/HTObr3i9dm9MOcYmvl+jqC59F69SVCrH↵R8Ii6VK/7mon4+7MVIazjoKGwPu/JxHgzQ5Q1BMjqTIOq4yysNPpnLHZzGaNPRgMxpZiXotQNR21↵SzgGIHKW/kslgrGOexhisPQ1riCQQJgpqbwOom+jhNLXKYeQ/5u84TkEUn9qubQusQAgLDJIwaob↵ffzwEEPB4TiMHqYNuZybK+bvPoQjr4MvsPWAy0xmM/BpgXEUMiUESCu8AMMAPsYWdIf5RCyXsEp0↵unweALIFDKIbfQg4CB+mi+l0iCuIDMIUCogfYJBDAIijDhBImI4y8AcAJHKGD0CIQfwLP+7C…cue62EvNADCKPsR0plzXWAQt5ilfwcgOwG12vb↵5eXzokdCeVeyFpoL949K+znQs6G/v186qsvtz8u7YwF7AFWhkxBcRi0ONlGcazXhAbCQFAolYPk5↵PnIIA6TdFwC/QvDbrHQ4ujE9/WISYIfY4uLC3yilIkmHWl373jmtQJScXJqZlrY6QKx+We2pqYkp↵q/P+D7VIWtvQDgmXi5gDUbA2yShX3+fscegteS6jIleqkOAaNhyGDmBSVAQiyJjGKQcx0Sorx6FB↵HNiDFhfn59l7Mh29vcy7vfKSlpY2p+x+LB6P/hpB+F6ybzYSqQZaHoAECQcm+D4+zRtxygflvZOT↵2awWR1SDa+Yv+rwbksJKWoirRMwb49fErS9a3TLYUUr9DOWB+GHp11kkO7ZkDhOBwJuGPm/Qk32G↵8VP+0ozhqtTL7dtOVRF3D88s2/ystsUqY8yUrYIHANFL7dNVVZcvpyQSHjouzgDRnpg4sxRIfgjA↵TVXXj7/6atWqwbnQ7rX+xAmCVEIVcLTWWqsWVpYAmgX+9cAWP5vVSiqX7Wez6ZX7KZj3GsAHl9tK↵EalVi4UUBKVSD/7h7FkCQasTCFCRamfaaeJK13QmSlDnSm7ezO3IlcBm9g6J5OjoqDR3I0rVETgf↵EppP2DI+9FBjHI765t89UpiB5rnkNiiJWCX1IHxlyEv6TKQak4DrqHdYoT9E3Dvrhb7oXl9IHAtE↵gUw3hcNmpZIcCRZie/YD+vxtwYE1BUEstBgJFkD3n2BlJZD1i1l+wPjXfYxX1LexmpqsppK6pYPe↵nzzl3VSVevxyImP1RkPcRbLpXTwX5xNY1OvxjHKkulGPwpPnAhC506/I1UktRqnUHgkJcfD6TOEA↵Mq6UoGafd2KRohHdC9GDswAS6QWzWdCZyD+Xle79Swjab/9SVSpCJWrBsfdKmv5QXtdc+vaSxz+R↵+DQbmKmqqtqWmjj9rEnGACLoC3ywc4dyrsx7yQg1aurr7bvE62K6tMZ+i30cAARI9Eg1iCMNYyMj↵GplNrtUWy+x41EeeDwGI+LxXGrsboQopeRcWFLXBevX7Uf4DjZnv9bHZ7HnfFe9BWPwb5vP50QD/↵SkTmcE5Ojo1l1/TKELNZaZ54oZAdDrw/geBUZTQAPeupslsi8FZF5erzXOfvWCxDysZ9p0/vZuxO↵2ZaytG4hxWLM/KQqnE6s+qdT7YxlKcGAMFn1KHvCBWhp+kFiYhVgZSkpj7x5E6Erw1KyBH7xEy5z↵u4cZKbBh6mrV46nSy8qzraSZIM2VSrVafTG4WgASg6w2dzHBziFoTYJyWRhByLOzcyEKZanjTYQj↵FLHq2mIhRumI/+EgNTdXqkZjQAyHAptXxjKkAJp1pFj6CeFo7saN4q0qbFGlUkhgsevZjXFVDBab↵AG1/bot6o/im9KjkrPSmOiPjHAAIgAfgWG02vVU/5eri9fWVm6yyehKp16TVWrhmsm9JjXgXYjG+↵OG4ex80RM4JEGjMbsXWvAezM0ulr5ubohVi4oIA+d/GtAwXpwWsUVbCz0ktpbt4pK7ad2IkK2+rq↵WCTGTwAENmwyqmBZYNnqFhxISruADHGBuKHzAO1hlC53F1oAbci7AzS6FLpmmXBEKJI5cYQbRlAc↵VUa9SbOhiFmlCmE0mGMvgCa9384tu22nYyq/n0ZTHVNz1RJ1re2Mjdvc0iz4+Iemissb4yagJduf↵3fMDZZJQCERYBZs+SyYjaMQkH3RfYjJdAMz9Rv2QWQOL4quLAMMaGRvT9OACuV6Awwn0SJSMsL05↵QENkZ3dn19x197pBWOi9ZAY70bhh3ACoE5sciXgnFry+wMJECMeV2yFC5tm4ZvvY4GRvt6GnBw/w↵lbLwxfR8yv8iK5XbqVRwn66p4lT0MIqo4kJZsd4l77Noi201r8Czt+n21P/GID6c6zHzkzGdAb7h↵VFUZkbEUKcqe6gidgZVWM8PDq2Ltbtg6k3j5EUCGYbHJUuMtA9adMFaeYeV5plOqUq/CQtCnGwyG↵TzcTuGqPGqBDEEbL9WCNyrUmFAU3DITrcAC6/QTfml2kUKit6lZKGMFoB0M+fyFGjW3ki7eelX6d↵G4tRVaqDmcsnEinQnY6Y+cbRD4++sXHr1o1wE0EVN28eHeVI/u0/qWgH4aioFT12wrblD/GtUp1E↵knt0abQnTw5ClhxQulqtVctxARUvr7WXlzd211xqNNXq5SaNxkCnV69ZBCCDlrxUbhjcPY0moSQz↵X+hPr1wCSNDrh7OqfkMvSD9QOHcRcCtVMLjYWvveTsFhgaytNIQkt9S1kX6yoJcI7fCrLl+//PQK↵PM3sghMcYOHV1PIgkVEIljuc/jtQuHMIFilXINOwo0KNUimz2HGw9sQBL5kSJWMLtPSkrDk4V27D↵hqy5dCDQaSC6gQjiT0o6vIVbTBA0vafXv/heMmtf6TOqYVa20SrAscpmZp7dWU0kvpRw5JWE6kIa↵7S0MiAurHLrMdXk+8oDAZ+nRjDQ0jMA5IECiOw0RBC+XCWUyAZxlhyBRXzQ6nj2Wfbuhl3V3cuzz↵sc97eoZwk9Y6WZStKdJAgzkaPxQK+Gh+RIYDJRKORSNhpdnsJNV0ZztkOFcJvWqRF7wUcw/Ch66w↵fJgYjcH5eCGhMHNf2q9YrDQQO5bAD9svUqcf9zv9pCpkpGxL3dYO66lWmj+eBAijbKlc8fGEqTKw↵4tuBkHz50RBP6PRQBr+/DKYLHxqhrNRvTackHl+7d20q8QcZMWLdCQtHCvZoUQxB4exWt9YuQlGw↵rnGhKhwPhPzeSm/WYhhOrkBUKop/4W/xxUpMJdm68eC9f8s9ejSXmitGStetVAksWwulcf/ta4CQ↵rW9sFceUrSJYhSWVftjxnxKqSP11K9qx89at4j9sPQuYmEK9Rb/FaDROAa4msHOtNitBYPkwg8lz↵2Ujl5VZHdmNjo7PeZi0X5u95rvq5QyB0dVCp1HgslytEDAahcGcz4iPPev30Qwfo/mCwcg6wexBD↵3unMSpr7SzzupfkOi46VckWi4mZZ2Dye1pL2ys8AyGnoAnP9+NNb9TDLzQMI4Sh0HmMeeNFTACE6↵T/+dqSVFYlFbtBzJuEaD+en541xBMVeJo0g0EMEQDPMnAVi8BecVvrAEEDgJGsNCcZV/Q5K3tVhQ↵bHyv2bZFXftic3J9U+YPay7grQKbX9XlqvaqfzDhBDxOb3rppcz8FyaEFdvb3m2BJ4Y8eMAlx3tG↵xuDpFQgfIz2GiC+iASEYx+GgC/AiAyEkijt6wWIfmwQAuXTJ7XwAxJQyPFA0ZjCz4dyDhUAUyKhA↵PBymeQMIrlBGIoBXAbxVF+HK+woUlQC2/X66L2wOxGMxMT8UjwcwH6YKYJjwyDDYjIkPa9iJuwH7↵SX21ahnqw4/dFH7Udn/JPLe9qmp693LR1e7hpxuensTMTNW2qva1a7ddf5nAeCRMZsrKUqZTUnYz↵HhpVEpd5Gfjf9HTi8b17114nPnkAvGQDVMe6tcXCbUVjPpwrNWZk9HO5aDiMKHE8DGKjCqHP+jEE↵CQvjIexv16795eA1SUcnhn59divt4Nb/C1aINPfmhabTK5w5ZYlXEk+jZ7/OkObm5n7dgapRhaID↵qHmCeutRlKL++mRT6bFzZ6ZywccIHQqC5UVYuwEPTFEc52q1Mlzw+4wzTJdVTnKUd3dnN2ZnN5Ks↵+vr6/OcOvfmmUKbO3UqNxXIltlqZwVleLhKgvvnZ/1N54NCh6jWwJf03BXPBSvo7B/45K2lBdc+7↵gLW2qmHx/bHa2nqNoaUuOe1niHTGTNXl1LWpTwOE+E0XD8YQ6PxjzDufl8Hp7/dwOBzoBfSR1COx↵5BEI9nFsMUjXaHCLlnsf4QrNSphDFyddnO08MLfh4oYkgBQ4bSqdBi6rKox4k2jpouYttawT79kI↵W158sbZW9Pa6H8EwAAh8/Jh5zRJAlkBCrGuUCTMzWUyb63wG78YNWEk+9O9fALkw9nnDUp98lBwx↵R8jkUGwjFYX5dH5IrMIv9fZmD4w73CS7Rc4k8QOBgxMb/tqQbSZHyHzfYgAwrINhJODz0gLiMA7P↵HyKRKBuwNnbO9vtKpUIiVdgbvReTLsaRUDQaj2OhkH/Wp1JhC+tOE5+qXk+8mpqY+DAaPOlEvfvZ↵1YpVUFNME4efoEarIsiT43O2bWu/+otT17ddJ5QtFzPCo7IUEFcYTzztwzs8nZh4dS9QIQ8TkU/s↵li0ttUZpq0qlUkstUqC4uar4IlUVCmHkkIodFwJBDlgDhoSARr73t/g9sZBC6URQXe7Wv+t0sCUq↵V1f76PdPfHU50UvM/EM/52vOJ2q1TtIRvxdvVZ8kbCGMHr2JltbaXgSs6qhayvkQiBAJFSUYCdJR↵D2DKHotUS+Do9Rm/7zpzzmV19Doa1zsM2dmGbAdpsLv6nUNvrl/fWIGEY9TtuEkuH2yrd8g0OBJ8↵K6ty7kBhJ50eTAcRpLKy4De/qaQHvbPYBfEvF8KoWqAWXSgVFLe11YEQz/jpcD4MRHoq9HVNeXo3↵S3N3gc2Yl9dvsUzlAZLV/xFsEOmXwlShBF4NrVUUCAaDaxAhwrXat4dxJMI2hwO/TILZGG/WBtgU↵nJT0L3O0BW86UCAgKPs3AJHEst0qaa7Vb2mqPXnyQuvhLxkzROKzjBU3JbYnViU+FiHEZ8YQqHzB↵QgK/SNuf8niAZt3g5d359NNPe3t7SZMjI9DRt6iaTI5gvkUvCCTKcDQyP+/L0ThrHJPjfKdczpT3↵uUuKc6momObrcSIBEIcBmeDTvF6xIsYHNCsajeJUsdkM8VFU9NyaK+RwLIZzwweV1mLnZ2xUgSCo↵in/wXsg7sRifmPhy+LFLxko57jQESErZ8EoafOanNUhV1eVEuLyfAZCn8+i7idMvn6pqPwVdTf6/↵AAMAp0AGWSXfjuAAAAAASUVORK5CYII=",
                 loaded: "loaded",
                 nombre: "training/images/L2_2A.png"
                 }}, {
                 id: 9,
                 correcta: 0,
                 orden: 2,
                 fecha: '',
                 visible: true,
                 texto: 'Texto dos img',
                 audio: {
                 nombre: '',
                 content: Object,
                 loaded: false
                 },
                 media: {
                 ContentType: "image/png",
                 content: "iVBORw0KGgoAAAANSUhEUgAAAyAAAAI/CAMAAAC4WU2gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ↵bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp↵bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6↵eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz↵NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo↵dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw↵dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv↵IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS↵ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD↵cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE↵PSJ4bXAuaWlkOkE5NTgzOEJFNDg0NTExRTY5ODk0QUZGMTE5MjEwNzY5IiB4bXBNTTpEb2N1bWVu↵dElEPSJ4bXAuZGlkOkE5NTgzOEJGNDg0NTExRTY5ODk0QUZGMTE5MjEwNzY5Ij4gPHhtcE1NOkRl↵cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTk1ODM4QkM0ODQ1MTFFNjk4OTRB↵RkYxMTkyMTA3NjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTk1ODM4QkQ0ODQ1MTFFNjk4↵OTRBRkYxMTkyMTA3NjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l↵dGE+IDw/eHBhY2tldCBlbmQ9InIiPz43fn5nAAADAFBMVEXGiFEHCgujUEydcW0ZRWfjvbvt3NjC↵qZLmuJfYq5nv18zSu7nYqoh7SSzAl64nJisWLkzUt6qiLhuFttKAMCTWrKk1bZLbj1FVKyLZvMrf↵183BaCt7Tkjf2tjZmXfDUiryzLvKiWW/eIzHmYjxzsrHmHZWkrXamoeajI/lx6rluYjYqXbamWTK↵inbgeVGeiXDz7eq/VUjnrYfHmprQx8medYnnrZfw6NzBrKfXm6+6eFOlZi/VuJnyyqrJl2N/IRDZ↵m5i2iGPMeVMMHC15am/oq3a6eWa8Z0FRRk23iXfRx7zKiol+ZU47U27WrbujVWa6d0DOeEDlx5eo↵Z0KSlqxtNETMemZqdY/3vbD3u5OmeFfnrancimO9aFQwDAsPERdaHhMOXYeqZ1fKipy2iYitVjQ3↵ia9fPyyfyuG3eXivmZyxmIiUZkG+ub5cpsuWVTPx17vBrLtXDgvci3d7Umb0yJexl3bEp3q7Z2eX↵QzTNenc/ZHu2iZ2UZ1jQZz/ZqGbVt4ixQzOmdkA2eaThz9jAt6mZQx2yQR6GqL+khlVmh56Qd1cy↵HBW3aHulRAbci4jBV2PPaFSuqKjltnbknHTrmmOtVBvmrrutqbt8EAjcaS+ylmWeN0PrnIggERfb↵i5xdobvoqWXz3+LPaWcyWYOVUx7ZeYv0z9Xh17w0gZnRx6rX3ufrnJzKzdaSdUL/4Nv53sxdfKa/↵fKXU6e7PaXzy16rFRRTFhDXXtnZSFCP7r3+EPRGCXTbG2N3cn1D/3LufX4KpuMHvil/M1817GCCh↵fKHviXbb6N51XYe5x8L8z7rsiZ/AZAv8z6r9oY7wiojDXYWbo5fchTyCf3blt2X5lnU4OTj/zsqn↵tqhdXVjh16sTGxn7nbP/16THn1ZiORX96MOoYgn/z9/lz8fnx77lz8/dx77Zz8fnx7bdx8foxsfl↵z77cvq7Zz8/itqbitrHqvrLdx7bqvqHfvqLZz77lz7LutqbqxtHdx9HttrHZz7PM173qw3zYtmfR↵NzAXPn5cjSFTAAUrbklEQVR42oy9f0wbeZYvSmGTurWmKDtr0wWUyTr13Piq29eTa9NdMTzAwfIv↵bEJkCE+eCzgOHgtsy4JFJjR47g2NyTh29+ygK5Ze8ryjfkF7e1phX49W00J4Vx010XSk+eOxlqy2↵LI01jwaP55lk+/W8Vev+s++cMunp6elOtpIQYsAuV53P+Xw+55zvNw1Tzz+IwcFBuVw+ODWVnSou↵LLAMyxaYuw8eHuocXIh1WItWq87K0SzLOsZHHzwcLVrz7kQ5w3K0P5OBR8esC4UQkylNDXpaXx4n↵iKLOWgxxjgWr251LuIvWBesjXbc1P7o1Onp3fHxct5Ev5uiitchMlbLw8qUswzjgNQ6Th4d5a4Fh↵BqVwNiXGnaNDZXfaJ0nn3e50KpVOpw1pdyLhS6TT7t1tw+5uzueL+dm9XNrtc+dyuXKZzoVojg6x↵5RCThbc0OJiFZ68fmcxeZs+Pxzz+7lf6leeV++veD3+9nbJYLDbzeqynp8fr9Y707Cjh6/vB4I6F↵zWYZz31piSjkIlw6R3NuOIqhUKgQKsCJZhiGwcv2woOR4/Ut4ZsdHITL69/by2Qykyxti3l7NJZA↵LJaLxGI7++v7++eDgYXuaFTWZHQ6yROZ0DI3qtvaikYLRInxFEpTRLeK6tJqNZ2vqZ4O264PfJ/S↵X79y+xcX7py/c2fzWgccmubXXmvu++/XLrzjnz84eOf8hTt3+pX99msdmhCRJTx3x4mprPJ244+1↵A0aVyhgWVKqn1OXLqiaVTJhr+WiBndzbm58/WDIvyiouV6VSrVZOTz8+VZ+emgSXSxBk1qxcLr0h↵HSQYIXlyvGaqCivd3Sujo1uPxsaWZiiKj9saGprJmYSEJPmGBo15QuMcMk6Tqs+e8EaTTEZRVICb↵ZDlr/u44M8WOjY1JBBnFay1a+NmZNybMTovFHAiYfauRkZGOkVU6Egl67Y2BxiU/xxBfu6pZhnAs↵SwflpanS1x4tQRzKB+XSwT/63m8c8E3PfgiCv+GPvvQt317HB34lW+AcIYh5Rv6jx48/zXMIEIfV↵mjcYaDpUGLP+aCu6MWrN53O5UMYfYiczfvjmbp1jYYGBH5e/d+MHywTh+DQfCjkWikUrB3HlLi50↵61YAJaNbW6N34dAdHhrcObe1yELwwkuWMo5CAUB3uPEpGc87mNKgVCqVl0pFOpeDi5NAPLgRHAY4↵0vAvPHbTbno3teuLsRl/Ig1fjuzm2FAukgOMlOlCqDTIwDtn4EJ8BZDM3h4iJOOH4PT7WfgUALJz↵pW8k0tOzvr8eC8Z2emKx1ZHVkRig585m0O7lALwFKQCkaIjAq8BpwIm7ObpQYB1soVAqAQ4HSy+C↵R2lKfqP1xqAUoVRiSgw7xkJmyWYn/aFYwOK1W2xeb4TeX9rZAYis++fZ7rm2pFEIO0lF0hTVWbu7↵t6JbBXwauOfE7ImCjGuud/3r9xUKPa96+pTXT0xcuH37DhwXOjrs9ivN1JP/0PdqR/Cddw7g93k4↵+tfX7S+9dMWfLTHSu+ODU9lJ5VsDAwOXn8pkKsEoPCUBKk9lgsI43HJ5Yf7eWx/tHSiVuWSlKqtW↵q0eVyunH759+bDLNCjJFspqHhCaXygEgld+3t6+trZ22AEB0o6OOSWKvUdPcbPY2bJq7uDEu4FRs↵901MXO/iZVXVybuf9ZKyyrHsiNc6J7OTjm6dxyMn4NYoJaTA8116nif1MzO3bvnSOV/A5rNEfKv2↵kZFYLOaFXzaJzTZzlc0SX11UuLeFux6pnGFK37jckOgBIKXn3pI/sIP8jwDyxz8F1xs+lESAyMUv↵ZxwOx1iIKRQBINF0kYNIz+cPIS5zHMdZN7YePtzIw5FjWTEnQxrMZMaAdqyFLEEAQO5DFDjcjhDH↵uq3WhQQwiHvBqtNZgYQePtz60d3RH42ObkR17rQ1X3QU8N1mswXARzGv0x1uGA7DxQKkWym8vZKD↵BoRAyLsTmLcBFKn0GUAQM5FcLu1b3S2z/pBbhIw7VC4Dojiapt1FB4P4gOA9I5ApBAhiBNhjEk4Z↵WGQPeITt95rNI/uYuZXrwZ7Vnpg3NdJwzb7er1xf31xdTRAinwHm075EDl8Ef7nFyxIC0mQymX8P↵QBjm/ps3INMBWoFCGD9dBnzAKfn9Xk2DWRnz6n0xGgJhZzO4E4yNsd3Dc7NhkuedvMtk0jkcCw7d↵aIHIFpbHx6cIwxGp5W2azidPFSpqWiV7qtLzkHqXkEIAIleuXAEK6dL2IUDe6T8QEbL+9rVr114a↵ycCt9ixL5VNE5o23Lv/1ZZVquE0mEzZUAtCISkFNzxj/+vLY3ljLzy9ePVC6Z6smlww4RGZSrz34↵WB3d2JC5qrOCLpspwS1CgLS3q9Vr6o2n3QtAId2ZyXk/HTObr3i9dm9MOcYmvl+jqC59F69SVCrH↵R8Ii6VK/7mon4+7MVIazjoKGwPu/JxHgzQ5Q1BMjqTIOq4yysNPpnLHZzGaNPRgMxpZiXotQNR21↵SzgGIHKW/kslgrGOexhisPQ1riCQQJgpqbwOom+jhNLXKYeQ/5u84TkEUn9qubQusQAgLDJIwaob↵ffzwEEPB4TiMHqYNuZybK+bvPoQjr4MvsPWAy0xmM/BpgXEUMiUESCu8AMMAPsYWdIf5RCyXsEp0↵unweALIFDKIbfQg4CB+mi+l0iCuIDMIUCogfYJBDAIijDhBImI4y8AcAJHKGD0CIQfwLP+7C…cue62EvNADCKPsR0plzXWAQt5ilfwcgOwG12vb↵5eXzokdCeVeyFpoL949K+znQs6G/v186qsvtz8u7YwF7AFWhkxBcRi0ONlGcazXhAbCQFAolYPk5↵PnIIA6TdFwC/QvDbrHQ4ujE9/WISYIfY4uLC3yilIkmHWl373jmtQJScXJqZlrY6QKx+We2pqYkp↵q/P+D7VIWtvQDgmXi5gDUbA2yShX3+fscegteS6jIleqkOAaNhyGDmBSVAQiyJjGKQcx0Sorx6FB↵HNiDFhfn59l7Mh29vcy7vfKSlpY2p+x+LB6P/hpB+F6ybzYSqQZaHoAECQcm+D4+zRtxygflvZOT↵2awWR1SDa+Yv+rwbksJKWoirRMwb49fErS9a3TLYUUr9DOWB+GHp11kkO7ZkDhOBwJuGPm/Qk32G↵8VP+0ozhqtTL7dtOVRF3D88s2/ystsUqY8yUrYIHANFL7dNVVZcvpyQSHjouzgDRnpg4sxRIfgjA↵TVXXj7/6atWqwbnQ7rX+xAmCVEIVcLTWWqsWVpYAmgX+9cAWP5vVSiqX7Wez6ZX7KZj3GsAHl9tK↵EalVi4UUBKVSD/7h7FkCQasTCFCRamfaaeJK13QmSlDnSm7ezO3IlcBm9g6J5OjoqDR3I0rVETgf↵EppP2DI+9FBjHI765t89UpiB5rnkNiiJWCX1IHxlyEv6TKQak4DrqHdYoT9E3Dvrhb7oXl9IHAtE↵gUw3hcNmpZIcCRZie/YD+vxtwYE1BUEstBgJFkD3n2BlJZD1i1l+wPjXfYxX1LexmpqsppK6pYPe↵nzzl3VSVevxyImP1RkPcRbLpXTwX5xNY1OvxjHKkulGPwpPnAhC506/I1UktRqnUHgkJcfD6TOEA↵Mq6UoGafd2KRohHdC9GDswAS6QWzWdCZyD+Xle79Swjab/9SVSpCJWrBsfdKmv5QXtdc+vaSxz+R↵+DQbmKmqqtqWmjj9rEnGACLoC3ywc4dyrsx7yQg1aurr7bvE62K6tMZ+i30cAARI9Eg1iCMNYyMj↵GplNrtUWy+x41EeeDwGI+LxXGrsboQopeRcWFLXBevX7Uf4DjZnv9bHZ7HnfFe9BWPwb5vP50QD/↵SkTmcE5Ojo1l1/TKELNZaZ54oZAdDrw/geBUZTQAPeupslsi8FZF5erzXOfvWCxDysZ9p0/vZuxO↵2ZaytG4hxWLM/KQqnE6s+qdT7YxlKcGAMFn1KHvCBWhp+kFiYhVgZSkpj7x5E6Erw1KyBH7xEy5z↵u4cZKbBh6mrV46nSy8qzraSZIM2VSrVafTG4WgASg6w2dzHBziFoTYJyWRhByLOzcyEKZanjTYQj↵FLHq2mIhRumI/+EgNTdXqkZjQAyHAptXxjKkAJp1pFj6CeFo7saN4q0qbFGlUkhgsevZjXFVDBab↵AG1/bot6o/im9KjkrPSmOiPjHAAIgAfgWG02vVU/5eri9fWVm6yyehKp16TVWrhmsm9JjXgXYjG+↵OG4ex80RM4JEGjMbsXWvAezM0ulr5ubohVi4oIA+d/GtAwXpwWsUVbCz0ktpbt4pK7ad2IkK2+rq↵WCTGTwAENmwyqmBZYNnqFhxISruADHGBuKHzAO1hlC53F1oAbci7AzS6FLpmmXBEKJI5cYQbRlAc↵VUa9SbOhiFmlCmE0mGMvgCa9384tu22nYyq/n0ZTHVNz1RJ1re2Mjdvc0iz4+Iemissb4yagJduf↵3fMDZZJQCERYBZs+SyYjaMQkH3RfYjJdAMz9Rv2QWQOL4quLAMMaGRvT9OACuV6Awwn0SJSMsL05↵QENkZ3dn19x197pBWOi9ZAY70bhh3ACoE5sciXgnFry+wMJECMeV2yFC5tm4ZvvY4GRvt6GnBw/w↵lbLwxfR8yv8iK5XbqVRwn66p4lT0MIqo4kJZsd4l77Noi201r8Czt+n21P/GID6c6zHzkzGdAb7h↵VFUZkbEUKcqe6gidgZVWM8PDq2Ltbtg6k3j5EUCGYbHJUuMtA9adMFaeYeV5plOqUq/CQtCnGwyG↵TzcTuGqPGqBDEEbL9WCNyrUmFAU3DITrcAC6/QTfml2kUKit6lZKGMFoB0M+fyFGjW3ki7eelX6d↵G4tRVaqDmcsnEinQnY6Y+cbRD4++sXHr1o1wE0EVN28eHeVI/u0/qWgH4aioFT12wrblD/GtUp1E↵knt0abQnTw5ClhxQulqtVctxARUvr7WXlzd211xqNNXq5SaNxkCnV69ZBCCDlrxUbhjcPY0moSQz↵X+hPr1wCSNDrh7OqfkMvSD9QOHcRcCtVMLjYWvveTsFhgaytNIQkt9S1kX6yoJcI7fCrLl+//PQK↵PM3sghMcYOHV1PIgkVEIljuc/jtQuHMIFilXINOwo0KNUimz2HGw9sQBL5kSJWMLtPSkrDk4V27D↵hqy5dCDQaSC6gQjiT0o6vIVbTBA0vafXv/heMmtf6TOqYVa20SrAscpmZp7dWU0kvpRw5JWE6kIa↵7S0MiAurHLrMdXk+8oDAZ+nRjDQ0jMA5IECiOw0RBC+XCWUyAZxlhyBRXzQ6nj2Wfbuhl3V3cuzz↵sc97eoZwk9Y6WZStKdJAgzkaPxQK+Gh+RIYDJRKORSNhpdnsJNV0ZztkOFcJvWqRF7wUcw/Ch66w↵fJgYjcH5eCGhMHNf2q9YrDQQO5bAD9svUqcf9zv9pCpkpGxL3dYO66lWmj+eBAijbKlc8fGEqTKw↵4tuBkHz50RBP6PRQBr+/DKYLHxqhrNRvTackHl+7d20q8QcZMWLdCQtHCvZoUQxB4exWt9YuQlGw↵rnGhKhwPhPzeSm/WYhhOrkBUKop/4W/xxUpMJdm68eC9f8s9ejSXmitGStetVAksWwulcf/ta4CQ↵rW9sFceUrSJYhSWVftjxnxKqSP11K9qx89at4j9sPQuYmEK9Rb/FaDROAa4msHOtNitBYPkwg8lz↵2Ujl5VZHdmNjo7PeZi0X5u95rvq5QyB0dVCp1HgslytEDAahcGcz4iPPev30Qwfo/mCwcg6wexBD↵3unMSpr7SzzupfkOi46VckWi4mZZ2Dye1pL2ys8AyGnoAnP9+NNb9TDLzQMI4Sh0HmMeeNFTACE6↵T/+dqSVFYlFbtBzJuEaD+en541xBMVeJo0g0EMEQDPMnAVi8BecVvrAEEDgJGsNCcZV/Q5K3tVhQ↵bHyv2bZFXftic3J9U+YPay7grQKbX9XlqvaqfzDhBDxOb3rppcz8FyaEFdvb3m2BJ4Y8eMAlx3tG↵xuDpFQgfIz2GiC+iASEYx+GgC/AiAyEkijt6wWIfmwQAuXTJ7XwAxJQyPFA0ZjCz4dyDhUAUyKhA↵PBymeQMIrlBGIoBXAbxVF+HK+woUlQC2/X66L2wOxGMxMT8UjwcwH6YKYJjwyDDYjIkPa9iJuwH7↵SX21ahnqw4/dFH7Udn/JPLe9qmp693LR1e7hpxuensTMTNW2qva1a7ddf5nAeCRMZsrKUqZTUnYz↵HhpVEpd5Gfjf9HTi8b17114nPnkAvGQDVMe6tcXCbUVjPpwrNWZk9HO5aDiMKHE8DGKjCqHP+jEE↵CQvjIexv16795eA1SUcnhn59divt4Nb/C1aINPfmhabTK5w5ZYlXEk+jZ7/OkObm5n7dgapRhaID↵qHmCeutRlKL++mRT6bFzZ6ZywccIHQqC5UVYuwEPTFEc52q1Mlzw+4wzTJdVTnKUd3dnN2ZnN5Ks↵+vr6/OcOvfmmUKbO3UqNxXIltlqZwVleLhKgvvnZ/1N54NCh6jWwJf03BXPBSvo7B/45K2lBdc+7↵gLW2qmHx/bHa2nqNoaUuOe1niHTGTNXl1LWpTwOE+E0XD8YQ6PxjzDufl8Hp7/dwOBzoBfSR1COx↵5BEI9nFsMUjXaHCLlnsf4QrNSphDFyddnO08MLfh4oYkgBQ4bSqdBi6rKox4k2jpouYttawT79kI↵W158sbZW9Pa6H8EwAAh8/Jh5zRJAlkBCrGuUCTMzWUyb63wG78YNWEk+9O9fALkw9nnDUp98lBwx↵R8jkUGwjFYX5dH5IrMIv9fZmD4w73CS7Rc4k8QOBgxMb/tqQbSZHyHzfYgAwrINhJODz0gLiMA7P↵HyKRKBuwNnbO9vtKpUIiVdgbvReTLsaRUDQaj2OhkH/Wp1JhC+tOE5+qXk+8mpqY+DAaPOlEvfvZ↵1YpVUFNME4efoEarIsiT43O2bWu/+otT17ddJ5QtFzPCo7IUEFcYTzztwzs8nZh4dS9QIQ8TkU/s↵li0ttUZpq0qlUkstUqC4uar4IlUVCmHkkIodFwJBDlgDhoSARr73t/g9sZBC6URQXe7Wv+t0sCUq↵V1f76PdPfHU50UvM/EM/52vOJ2q1TtIRvxdvVZ8kbCGMHr2JltbaXgSs6qhayvkQiBAJFSUYCdJR↵D2DKHotUS+Do9Rm/7zpzzmV19Doa1zsM2dmGbAdpsLv6nUNvrl/fWIGEY9TtuEkuH2yrd8g0OBJ8↵K6ty7kBhJ50eTAcRpLKy4De/qaQHvbPYBfEvF8KoWqAWXSgVFLe11YEQz/jpcD4MRHoq9HVNeXo3↵S3N3gc2Yl9dvsUzlAZLV/xFsEOmXwlShBF4NrVUUCAaDaxAhwrXat4dxJMI2hwO/TILZGG/WBtgU↵nJT0L3O0BW86UCAgKPs3AJHEst0qaa7Vb2mqPXnyQuvhLxkzROKzjBU3JbYnViU+FiHEZ8YQqHzB↵QgK/SNuf8niAZt3g5d359NNPe3t7SZMjI9DRt6iaTI5gvkUvCCTKcDQyP+/L0ThrHJPjfKdczpT3↵uUuKc6momObrcSIBEIcBmeDTvF6xIsYHNCsajeJUsdkM8VFU9NyaK+RwLIZzwweV1mLnZ2xUgSCo↵in/wXsg7sRifmPhy+LFLxko57jQESErZ8EoafOanNUhV1eVEuLyfAZCn8+i7idMvn6pqPwVdTf6/↵AAMAp0AGWSXfjuAAAAAASUVORK5CYII=",
                 loaded: "loaded",
                 nombre: "training/images/L2_2A.png"
                 }}, {
                 id: 9,
                 correcta: 0,
                 orden: 2,
                 fecha: '',
                 visible: true,
                 texto: 'Texto dos',
                 audio: {
                 nombre: '',
                 content: Object,
                 loaded: false
                 }
                 }, {
                 id: 9,
                 correcta: 0,
                 orden: 1,
                 fecha: '',
                 visible: true,
                 texto: 'Texto uno',
                 audio: {
                 nombre: '',
                 content: Object,
                 loaded: false
                 }
                 }, {
                 id: 9,
                 correcta: 0,
                 orden: 3,
                 fecha: '',
                 visible: true,
                 texto: 'Texto tres img',
                 audio: {
                 nombre: '',
                 content: Object,
                 loaded: false
                 },
                 media: {
                 ContentType: "image/png",
                 content: "iVBORw0KGgoAAAANSUhEUgAAAyAAAAI/CAMAAAC4WU2gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ↵bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp↵bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6↵eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz↵NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo↵dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw↵dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv↵IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS↵ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD↵cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE↵PSJ4bXAuaWlkOkE5NTgzOEJFNDg0NTExRTY5ODk0QUZGMTE5MjEwNzY5IiB4bXBNTTpEb2N1bWVu↵dElEPSJ4bXAuZGlkOkE5NTgzOEJGNDg0NTExRTY5ODk0QUZGMTE5MjEwNzY5Ij4gPHhtcE1NOkRl↵cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTk1ODM4QkM0ODQ1MTFFNjk4OTRB↵RkYxMTkyMTA3NjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTk1ODM4QkQ0ODQ1MTFFNjk4↵OTRBRkYxMTkyMTA3NjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l↵dGE+IDw/eHBhY2tldCBlbmQ9InIiPz43fn5nAAADAFBMVEXGiFEHCgujUEydcW0ZRWfjvbvt3NjC↵qZLmuJfYq5nv18zSu7nYqoh7SSzAl64nJisWLkzUt6qiLhuFttKAMCTWrKk1bZLbj1FVKyLZvMrf↵183BaCt7Tkjf2tjZmXfDUiryzLvKiWW/eIzHmYjxzsrHmHZWkrXamoeajI/lx6rluYjYqXbamWTK↵inbgeVGeiXDz7eq/VUjnrYfHmprQx8medYnnrZfw6NzBrKfXm6+6eFOlZi/VuJnyyqrJl2N/IRDZ↵m5i2iGPMeVMMHC15am/oq3a6eWa8Z0FRRk23iXfRx7zKiol+ZU47U27WrbujVWa6d0DOeEDlx5eo↵Z0KSlqxtNETMemZqdY/3vbD3u5OmeFfnrancimO9aFQwDAsPERdaHhMOXYeqZ1fKipy2iYitVjQ3↵ia9fPyyfyuG3eXivmZyxmIiUZkG+ub5cpsuWVTPx17vBrLtXDgvci3d7Umb0yJexl3bEp3q7Z2eX↵QzTNenc/ZHu2iZ2UZ1jQZz/ZqGbVt4ixQzOmdkA2eaThz9jAt6mZQx2yQR6GqL+khlVmh56Qd1cy↵HBW3aHulRAbci4jBV2PPaFSuqKjltnbknHTrmmOtVBvmrrutqbt8EAjcaS+ylmWeN0PrnIggERfb↵i5xdobvoqWXz3+LPaWcyWYOVUx7ZeYv0z9Xh17w0gZnRx6rX3ufrnJzKzdaSdUL/4Nv53sxdfKa/↵fKXU6e7PaXzy16rFRRTFhDXXtnZSFCP7r3+EPRGCXTbG2N3cn1D/3LufX4KpuMHvil/M1817GCCh↵fKHviXbb6N51XYe5x8L8z7rsiZ/AZAv8z6r9oY7wiojDXYWbo5fchTyCf3blt2X5lnU4OTj/zsqn↵tqhdXVjh16sTGxn7nbP/16THn1ZiORX96MOoYgn/z9/lz8fnx77lz8/dx77Zz8fnx7bdx8foxsfl↵z77cvq7Zz8/itqbitrHqvrLdx7bqvqHfvqLZz77lz7LutqbqxtHdx9HttrHZz7PM173qw3zYtmfR↵NzAXPn5cjSFTAAUrbklEQVR42oy9f0wbeZYvSmGTurWmKDtr0wWUyTr13Piq29eTa9NdMTzAwfIv↵bEJkCE+eCzgOHgtsy4JFJjR47g2NyTh29+ygK5Ze8ryjfkF7e1phX49W00J4Vx010XSk+eOxlqy2↵LI01jwaP55lk+/W8Vev+s++cMunp6elOtpIQYsAuV53P+Xw+55zvNw1Tzz+IwcFBuVw+ODWVnSou↵LLAMyxaYuw8eHuocXIh1WItWq87K0SzLOsZHHzwcLVrz7kQ5w3K0P5OBR8esC4UQkylNDXpaXx4n↵iKLOWgxxjgWr251LuIvWBesjXbc1P7o1Onp3fHxct5Ev5uiitchMlbLw8qUswzjgNQ6Th4d5a4Fh↵BqVwNiXGnaNDZXfaJ0nn3e50KpVOpw1pdyLhS6TT7t1tw+5uzueL+dm9XNrtc+dyuXKZzoVojg6x↵5RCThbc0OJiFZ68fmcxeZs+Pxzz+7lf6leeV++veD3+9nbJYLDbzeqynp8fr9Y707Cjh6/vB4I6F↵zWYZz31piSjkIlw6R3NuOIqhUKgQKsCJZhiGwcv2woOR4/Ut4ZsdHITL69/by2Qykyxti3l7NJZA↵LJaLxGI7++v7++eDgYXuaFTWZHQ6yROZ0DI3qtvaikYLRInxFEpTRLeK6tJqNZ2vqZ4O264PfJ/S↵X79y+xcX7py/c2fzWgccmubXXmvu++/XLrzjnz84eOf8hTt3+pX99msdmhCRJTx3x4mprPJ244+1↵A0aVyhgWVKqn1OXLqiaVTJhr+WiBndzbm58/WDIvyiouV6VSrVZOTz8+VZ+emgSXSxBk1qxcLr0h↵HSQYIXlyvGaqCivd3Sujo1uPxsaWZiiKj9saGprJmYSEJPmGBo15QuMcMk6Tqs+e8EaTTEZRVICb↵ZDlr/u44M8WOjY1JBBnFay1a+NmZNybMTovFHAiYfauRkZGOkVU6Egl67Y2BxiU/xxBfu6pZhnAs↵SwflpanS1x4tQRzKB+XSwT/63m8c8E3PfgiCv+GPvvQt317HB34lW+AcIYh5Rv6jx48/zXMIEIfV↵mjcYaDpUGLP+aCu6MWrN53O5UMYfYiczfvjmbp1jYYGBH5e/d+MHywTh+DQfCjkWikUrB3HlLi50↵61YAJaNbW6N34dAdHhrcObe1yELwwkuWMo5CAUB3uPEpGc87mNKgVCqVl0pFOpeDi5NAPLgRHAY4↵0vAvPHbTbno3teuLsRl/Ig1fjuzm2FAukgOMlOlCqDTIwDtn4EJ8BZDM3h4iJOOH4PT7WfgUALJz↵pW8k0tOzvr8eC8Z2emKx1ZHVkRig585m0O7lALwFKQCkaIjAq8BpwIm7ObpQYB1soVAqAQ4HSy+C↵R2lKfqP1xqAUoVRiSgw7xkJmyWYn/aFYwOK1W2xeb4TeX9rZAYis++fZ7rm2pFEIO0lF0hTVWbu7↵t6JbBXwauOfE7ImCjGuud/3r9xUKPa96+pTXT0xcuH37DhwXOjrs9ivN1JP/0PdqR/Cddw7g93k4↵+tfX7S+9dMWfLTHSu+ODU9lJ5VsDAwOXn8pkKsEoPCUBKk9lgsI43HJ5Yf7eWx/tHSiVuWSlKqtW↵q0eVyunH759+bDLNCjJFspqHhCaXygEgld+3t6+trZ22AEB0o6OOSWKvUdPcbPY2bJq7uDEu4FRs↵901MXO/iZVXVybuf9ZKyyrHsiNc6J7OTjm6dxyMn4NYoJaTA8116nif1MzO3bvnSOV/A5rNEfKv2↵kZFYLOaFXzaJzTZzlc0SX11UuLeFux6pnGFK37jckOgBIKXn3pI/sIP8jwDyxz8F1xs+lESAyMUv↵ZxwOx1iIKRQBINF0kYNIz+cPIS5zHMdZN7YePtzIw5FjWTEnQxrMZMaAdqyFLEEAQO5DFDjcjhDH↵uq3WhQQwiHvBqtNZgYQePtz60d3RH42ObkR17rQ1X3QU8N1mswXARzGv0x1uGA7DxQKkWym8vZKD↵BoRAyLsTmLcBFKn0GUAQM5FcLu1b3S2z/pBbhIw7VC4Dojiapt1FB4P4gOA9I5ApBAhiBNhjEk4Z↵WGQPeITt95rNI/uYuZXrwZ7Vnpg3NdJwzb7er1xf31xdTRAinwHm075EDl8Ef7nFyxIC0mQymX8P↵QBjm/ps3INMBWoFCGD9dBnzAKfn9Xk2DWRnz6n0xGgJhZzO4E4yNsd3Dc7NhkuedvMtk0jkcCw7d↵aIHIFpbHx6cIwxGp5W2azidPFSpqWiV7qtLzkHqXkEIAIleuXAEK6dL2IUDe6T8QEbL+9rVr114a↵ycCt9ixL5VNE5o23Lv/1ZZVquE0mEzZUAtCISkFNzxj/+vLY3ljLzy9ePVC6Z6smlww4RGZSrz34↵WB3d2JC5qrOCLpspwS1CgLS3q9Vr6o2n3QtAId2ZyXk/HTObr3i9dm9MOcYmvl+jqC59F69SVCrH↵R8Ii6VK/7mon4+7MVIazjoKGwPu/JxHgzQ5Q1BMjqTIOq4yysNPpnLHZzGaNPRgMxpZiXotQNR21↵SzgGIHKW/kslgrGOexhisPQ1riCQQJgpqbwOom+jhNLXKYeQ/5u84TkEUn9qubQusQAgLDJIwaob↵ffzwEEPB4TiMHqYNuZybK+bvPoQjr4MvsPWAy0xmM/BpgXEUMiUESCu8AMMAPsYWdIf5RCyXsEp0↵unweALIFDKIbfQg4CB+mi+l0iCuIDMIUCogfYJBDAIijDhBImI4y8AcAJHKGD0CIQfwLP+7C…cue62EvNADCKPsR0plzXWAQt5ilfwcgOwG12vb↵5eXzokdCeVeyFpoL949K+znQs6G/v186qsvtz8u7YwF7AFWhkxBcRi0ONlGcazXhAbCQFAolYPk5↵PnIIA6TdFwC/QvDbrHQ4ujE9/WISYIfY4uLC3yilIkmHWl373jmtQJScXJqZlrY6QKx+We2pqYkp↵q/P+D7VIWtvQDgmXi5gDUbA2yShX3+fscegteS6jIleqkOAaNhyGDmBSVAQiyJjGKQcx0Sorx6FB↵HNiDFhfn59l7Mh29vcy7vfKSlpY2p+x+LB6P/hpB+F6ybzYSqQZaHoAECQcm+D4+zRtxygflvZOT↵2awWR1SDa+Yv+rwbksJKWoirRMwb49fErS9a3TLYUUr9DOWB+GHp11kkO7ZkDhOBwJuGPm/Qk32G↵8VP+0ozhqtTL7dtOVRF3D88s2/ystsUqY8yUrYIHANFL7dNVVZcvpyQSHjouzgDRnpg4sxRIfgjA↵TVXXj7/6atWqwbnQ7rX+xAmCVEIVcLTWWqsWVpYAmgX+9cAWP5vVSiqX7Wez6ZX7KZj3GsAHl9tK↵EalVi4UUBKVSD/7h7FkCQasTCFCRamfaaeJK13QmSlDnSm7ezO3IlcBm9g6J5OjoqDR3I0rVETgf↵EppP2DI+9FBjHI765t89UpiB5rnkNiiJWCX1IHxlyEv6TKQak4DrqHdYoT9E3Dvrhb7oXl9IHAtE↵gUw3hcNmpZIcCRZie/YD+vxtwYE1BUEstBgJFkD3n2BlJZD1i1l+wPjXfYxX1LexmpqsppK6pYPe↵nzzl3VSVevxyImP1RkPcRbLpXTwX5xNY1OvxjHKkulGPwpPnAhC506/I1UktRqnUHgkJcfD6TOEA↵Mq6UoGafd2KRohHdC9GDswAS6QWzWdCZyD+Xle79Swjab/9SVSpCJWrBsfdKmv5QXtdc+vaSxz+R↵+DQbmKmqqtqWmjj9rEnGACLoC3ywc4dyrsx7yQg1aurr7bvE62K6tMZ+i30cAARI9Eg1iCMNYyMj↵GplNrtUWy+x41EeeDwGI+LxXGrsboQopeRcWFLXBevX7Uf4DjZnv9bHZ7HnfFe9BWPwb5vP50QD/↵SkTmcE5Ojo1l1/TKELNZaZ54oZAdDrw/geBUZTQAPeupslsi8FZF5erzXOfvWCxDysZ9p0/vZuxO↵2ZaytG4hxWLM/KQqnE6s+qdT7YxlKcGAMFn1KHvCBWhp+kFiYhVgZSkpj7x5E6Erw1KyBH7xEy5z↵u4cZKbBh6mrV46nSy8qzraSZIM2VSrVafTG4WgASg6w2dzHBziFoTYJyWRhByLOzcyEKZanjTYQj↵FLHq2mIhRumI/+EgNTdXqkZjQAyHAptXxjKkAJp1pFj6CeFo7saN4q0qbFGlUkhgsevZjXFVDBab↵AG1/bot6o/im9KjkrPSmOiPjHAAIgAfgWG02vVU/5eri9fWVm6yyehKp16TVWrhmsm9JjXgXYjG+↵OG4ex80RM4JEGjMbsXWvAezM0ulr5ubohVi4oIA+d/GtAwXpwWsUVbCz0ktpbt4pK7ad2IkK2+rq↵WCTGTwAENmwyqmBZYNnqFhxISruADHGBuKHzAO1hlC53F1oAbci7AzS6FLpmmXBEKJI5cYQbRlAc↵VUa9SbOhiFmlCmE0mGMvgCa9384tu22nYyq/n0ZTHVNz1RJ1re2Mjdvc0iz4+Iemissb4yagJduf↵3fMDZZJQCERYBZs+SyYjaMQkH3RfYjJdAMz9Rv2QWQOL4quLAMMaGRvT9OACuV6Awwn0SJSMsL05↵QENkZ3dn19x197pBWOi9ZAY70bhh3ACoE5sciXgnFry+wMJECMeV2yFC5tm4ZvvY4GRvt6GnBw/w↵lbLwxfR8yv8iK5XbqVRwn66p4lT0MIqo4kJZsd4l77Noi201r8Czt+n21P/GID6c6zHzkzGdAb7h↵VFUZkbEUKcqe6gidgZVWM8PDq2Ltbtg6k3j5EUCGYbHJUuMtA9adMFaeYeV5plOqUq/CQtCnGwyG↵TzcTuGqPGqBDEEbL9WCNyrUmFAU3DITrcAC6/QTfml2kUKit6lZKGMFoB0M+fyFGjW3ki7eelX6d↵G4tRVaqDmcsnEinQnY6Y+cbRD4++sXHr1o1wE0EVN28eHeVI/u0/qWgH4aioFT12wrblD/GtUp1E↵knt0abQnTw5ClhxQulqtVctxARUvr7WXlzd211xqNNXq5SaNxkCnV69ZBCCDlrxUbhjcPY0moSQz↵X+hPr1wCSNDrh7OqfkMvSD9QOHcRcCtVMLjYWvveTsFhgaytNIQkt9S1kX6yoJcI7fCrLl+//PQK↵PM3sghMcYOHV1PIgkVEIljuc/jtQuHMIFilXINOwo0KNUimz2HGw9sQBL5kSJWMLtPSkrDk4V27D↵hqy5dCDQaSC6gQjiT0o6vIVbTBA0vafXv/heMmtf6TOqYVa20SrAscpmZp7dWU0kvpRw5JWE6kIa↵7S0MiAurHLrMdXk+8oDAZ+nRjDQ0jMA5IECiOw0RBC+XCWUyAZxlhyBRXzQ6nj2Wfbuhl3V3cuzz↵sc97eoZwk9Y6WZStKdJAgzkaPxQK+Gh+RIYDJRKORSNhpdnsJNV0ZztkOFcJvWqRF7wUcw/Ch66w↵fJgYjcH5eCGhMHNf2q9YrDQQO5bAD9svUqcf9zv9pCpkpGxL3dYO66lWmj+eBAijbKlc8fGEqTKw↵4tuBkHz50RBP6PRQBr+/DKYLHxqhrNRvTackHl+7d20q8QcZMWLdCQtHCvZoUQxB4exWt9YuQlGw↵rnGhKhwPhPzeSm/WYhhOrkBUKop/4W/xxUpMJdm68eC9f8s9ejSXmitGStetVAksWwulcf/ta4CQ↵rW9sFceUrSJYhSWVftjxnxKqSP11K9qx89at4j9sPQuYmEK9Rb/FaDROAa4msHOtNitBYPkwg8lz↵2Ujl5VZHdmNjo7PeZi0X5u95rvq5QyB0dVCp1HgslytEDAahcGcz4iPPev30Qwfo/mCwcg6wexBD↵3unMSpr7SzzupfkOi46VckWi4mZZ2Dye1pL2ys8AyGnoAnP9+NNb9TDLzQMI4Sh0HmMeeNFTACE6↵T/+dqSVFYlFbtBzJuEaD+en541xBMVeJo0g0EMEQDPMnAVi8BecVvrAEEDgJGsNCcZV/Q5K3tVhQ↵bHyv2bZFXftic3J9U+YPay7grQKbX9XlqvaqfzDhBDxOb3rppcz8FyaEFdvb3m2BJ4Y8eMAlx3tG↵xuDpFQgfIz2GiC+iASEYx+GgC/AiAyEkijt6wWIfmwQAuXTJ7XwAxJQyPFA0ZjCz4dyDhUAUyKhA↵PBymeQMIrlBGIoBXAbxVF+HK+woUlQC2/X66L2wOxGMxMT8UjwcwH6YKYJjwyDDYjIkPa9iJuwH7↵SX21ahnqw4/dFH7Udn/JPLe9qmp693LR1e7hpxuensTMTNW2qva1a7ddf5nAeCRMZsrKUqZTUnYz↵HhpVEpd5Gfjf9HTi8b17114nPnkAvGQDVMe6tcXCbUVjPpwrNWZk9HO5aDiMKHE8DGKjCqHP+jEE↵CQvjIexv16795eA1SUcnhn59divt4Nb/C1aINPfmhabTK5w5ZYlXEk+jZ7/OkObm5n7dgapRhaID↵qHmCeutRlKL++mRT6bFzZ6ZywccIHQqC5UVYuwEPTFEc52q1Mlzw+4wzTJdVTnKUd3dnN2ZnN5Ks↵+vr6/OcOvfmmUKbO3UqNxXIltlqZwVleLhKgvvnZ/1N54NCh6jWwJf03BXPBSvo7B/45K2lBdc+7↵gLW2qmHx/bHa2nqNoaUuOe1niHTGTNXl1LWpTwOE+E0XD8YQ6PxjzDufl8Hp7/dwOBzoBfSR1COx↵5BEI9nFsMUjXaHCLlnsf4QrNSphDFyddnO08MLfh4oYkgBQ4bSqdBi6rKox4k2jpouYttawT79kI↵W158sbZW9Pa6H8EwAAh8/Jh5zRJAlkBCrGuUCTMzWUyb63wG78YNWEk+9O9fALkw9nnDUp98lBwx↵R8jkUGwjFYX5dH5IrMIv9fZmD4w73CS7Rc4k8QOBgxMb/tqQbSZHyHzfYgAwrINhJODz0gLiMA7P↵HyKRKBuwNnbO9vtKpUIiVdgbvReTLsaRUDQaj2OhkH/Wp1JhC+tOE5+qXk+8mpqY+DAaPOlEvfvZ↵1YpVUFNME4efoEarIsiT43O2bWu/+otT17ddJ5QtFzPCo7IUEFcYTzztwzs8nZh4dS9QIQ8TkU/s↵li0ttUZpq0qlUkstUqC4uar4IlUVCmHkkIodFwJBDlgDhoSARr73t/g9sZBC6URQXe7Wv+t0sCUq↵V1f76PdPfHU50UvM/EM/52vOJ2q1TtIRvxdvVZ8kbCGMHr2JltbaXgSs6qhayvkQiBAJFSUYCdJR↵D2DKHotUS+Do9Rm/7zpzzmV19Doa1zsM2dmGbAdpsLv6nUNvrl/fWIGEY9TtuEkuH2yrd8g0OBJ8↵K6ty7kBhJ50eTAcRpLKy4De/qaQHvbPYBfEvF8KoWqAWXSgVFLe11YEQz/jpcD4MRHoq9HVNeXo3↵S3N3gc2Yl9dvsUzlAZLV/xFsEOmXwlShBF4NrVUUCAaDaxAhwrXat4dxJMI2hwO/TILZGG/WBtgU↵nJT0L3O0BW86UCAgKPs3AJHEst0qaa7Vb2mqPXnyQuvhLxkzROKzjBU3JbYnViU+FiHEZ8YQqHzB↵QgK/SNuf8niAZt3g5d359NNPe3t7SZMjI9DRt6iaTI5gvkUvCCTKcDQyP+/L0ThrHJPjfKdczpT3↵uUuKc6momObrcSIBEIcBmeDTvF6xIsYHNCsajeJUsdkM8VFU9NyaK+RwLIZzwweV1mLnZ2xUgSCo↵in/wXsg7sRifmPhy+LFLxko57jQESErZ8EoafOanNUhV1eVEuLyfAZCn8+i7idMvn6pqPwVdTf6/↵AAMAp0AGWSXfjuAAAAAASUVORK5CYII=",
                 loaded: "loaded",
                 nombre: "training/images/L2_2A.png"
                 }}, {
                 id: 9,
                 correcta: 0,
                 orden: 3,
                 fecha: '',
                 visible: true,
                 texto: 'Texto tres',
                 audio: {
                 nombre: '',
                 content: Object,
                 loaded: false
                 }
                 }];
                 
                 $scope.unidad.opciones = {};
                 $scope.unidad.opciones = opciones;
                 /*  FIN - DATOS DUMMY PARA PROBAR PAREJAS */

                if ($scope.unidad.opciones.length == 3 || $scope.unidad.opciones.length == 6) {
                    $scope.unidad.colspan = 4;
                } else if ($scope.unidad.opciones.length == 2) {
                    $scope.unidad.opciones.colspan = 6;
                } else {
                    $scope.unidad.colspan = 3;
                }
                 
                 
                 /*
                 * Se define el tipo de pregunta para adaptar el funcionamiento
                 * id = 1 ; Contenidos
                 * id = 2; Parejas
                 * id = 3,4,5; Opción multiple con única respuesta, y verdadero o falso.
                 * 
                 */

                $scope.tipoPregunta = $scope.unidad.tipo.id;
                /*$scope.tipoPregunta = 2;*/

                /* Obtenemos la cantidad de preguntas correctas*/
                var respuestasCorrectas = 0;
                var respuestasSeleccionadas = 0;



                for (var i in $scope.unidad.opciones) {
                    if ($scope.unidad.opciones[i].correcta == 1) {
                        respuestasCorrectas++;
                    }
                    $scope.unidad.opciones[i].estilo = '';
                    $scope.unidad.opciones[i].selected = false;
                    $scope.unidad.opciones[i].evaluacion = false;
                    $scope.unidad.opciones[i].sticker = 'remove mal';
                    $scope.unidad.opciones[i].pareja = '';
                    $scope.unidad.opciones[i].match = '';

                    if (typeof $scope.unidad.opciones[i].media !== 'undefined') {
                        if ($scope.unidad.opciones[i].media.loaded === "loaded") {
                            $scope.unidad.opciones[i].media.mostrar = true;
                            $scope.unidad.opciones[i].media.imagen = 'opcion-con-imagen';
                        } else {
                            $scope.unidad.opciones[i].media.mostrar = false;
                            $scope.unidad.opciones[i].media.imagen = '';
                        }
                    }

                    if (typeof $scope.unidad.opciones[i].audio !== 'undefined') {
                        if ($scope.unidad.opciones[i].audio.loaded === "loaded") {
                            $scope.unidad.opciones[i].audio.mostrar = true;
                            $scope.unidad.opciones[i].audio.audio = ngAudio.load('data:audio/mpeg;base64,' + $scope.unidad.opciones[i].audio.content);
                            console.log($scope.unidad.opciones[i].audio.audio);

                        } else {
                            $scope.unidad.opciones[i].audio.mostrar = false;
                        }
                    }
                }



                $scope.botonCalificar = {
                    estilo: 'no-activo',
                    disabled: 'disabled'
                };


                $scope.seleccionarOpcion = function (index) {
                    if ($scope.unidad.opciones[index].selected) {
                        $scope.unidad.opciones[index].estilo = '';
                        $scope.unidad.opciones[index].selected = false;
                        respuestasSeleccionadas--;
                    } else {
                        $scope.unidad.opciones[index].estilo = 'selected';
                        $scope.unidad.opciones[index].selected = true;
                        respuestasSeleccionadas++;
                    }

                    if (respuestasCorrectas === 1) {
                        for (var i in $scope.unidad.opciones) {
                            if (i !== index) {
                                if ($scope.unidad.opciones[i].selected) {
                                    $scope.unidad.opciones[i].estilo = '';
                                    $scope.unidad.opciones[i].selected = false;
                                    $scope.unidad.opciones[i].evaluacion = false;
                                    respuestasSeleccionadas--;
                                }
                            }
                        }
                    }

                    if (respuestasSeleccionadas === respuestasCorrectas) {
                        $scope.botonCalificar.estilo = 'activo';
                        $scope.botonCalificar.disabled = '';
                    } else {
                        $scope.botonCalificar.estilo = 'no-activo';
                        $scope.botonCalificar.disabled = 'disabled';
                    }

                };

                var parejasContador = 0;
                var pareja1Orden = 0;
                var pareja2Orden = 0;
                var pareja1Pos = 0;
                var pareja2Pos = 0;
                var parejasCorrectas = 0;

                $scope.seleccionarPareja = function (index) {
                    if ($scope.unidad.opciones[index].selected) {
                        $scope.unidad.opciones[index].pareja = '';
                        $scope.unidad.opciones[index].selected = false;

                        /*Borrar la respuesta correcta para validar más adelante si es una pareja*/
                        //respuestasSeleccionadas--;
                        parejasContador--;


                    } else {
                        $scope.unidad.opciones[index].pareja = 'pareja-' + $scope.unidad.opciones[index].orden;
                        $scope.unidad.opciones[index].selected = true;
                        /*Almacenar la respuesta correcta para validar más adelante si es una pareja*/
                        //respuestasSeleccionadas++;
                        parejasContador++;
                        if (parejasContador == 1) {
                            pareja1Orden = $scope.unidad.opciones[index].orden;
                            pareja1Pos = index;
                        } else if (parejasContador == 2) {
                            pareja2Orden = $scope.unidad.opciones[index].orden;
                            pareja2Pos = index;

                            if (pareja1Orden == pareja2Orden) {
                                console.log("Hay Match");

                                /*Estilos para la pareja actual*/
                                $scope.unidad.opciones[pareja2Pos].pareja = 'pareja-' + pareja2Orden;
                                $scope.unidad.opciones[pareja2Pos].selected = false;
                                $scope.unidad.opciones[pareja2Pos].match = 'match';

                                /*Estilos para pareja anterior*/
                                $scope.unidad.opciones[pareja1Pos].pareja = 'pareja-' + pareja2Orden;
                                $scope.unidad.opciones[pareja1Pos].selected = false;
                                $scope.unidad.opciones[pareja1Pos].match = 'match';

                                parejasContador = 0;
                                pareja1Pos = 0;
                                pareja2Pos = 0;
                                pareja1Orden = 0;
                                pareja2Orden = 0;

                                parejasCorrectas++;
                                console.log(parejasCorrectas + " parejas correctas de " + ($scope.unidad.opciones.length / 2));

                                if (parejasCorrectas == ($scope.unidad.opciones.length / 2)) {
                                    /*Si las parejas correctas es igual a la mitad de la cantidad de opciones habilitar el botón de continuar*/
                                    $scope.estadoUnidad = 'acierto';
                                }

                            } else {
                                $scope.unidad.opciones[pareja2Pos].pareja = '';
                                $scope.unidad.opciones[pareja2Pos].selected = false;
                                $scope.unidad.opciones[pareja2Pos].match = '';
                                $scope.unidad.opciones[pareja1Pos].pareja = '';
                                $scope.unidad.opciones[pareja1Pos].selected = false;
                                $scope.unidad.opciones[pareja1Pos].match = '';
                                parejasContador = 0;
                                pareja1Pos = 0;
                                pareja2Pos = 0;
                                pareja1Orden = 0;
                                pareja2Orden = 0;

                            }
                        }
                    }


                };

                $scope.calificarUnidad = function () {
                    /* Validar si acerto o fallo*/
                    var respuestasAcertadas = 0;
                    for (var i in $scope.unidad.opciones) {
                        if ($scope.unidad.opciones[i].selected) {
                            $scope.unidad.opciones[i].evaluacion = true;
                            if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                                $scope.unidad.opciones[i].sticker = 'ok bien';
                                respuestasAcertadas++;
                            }else{
                                /* Almacena la respuesta incorrecta */
                                $scope.unidad.feedback = $scope.unidad.opciones[i].feedback;
                            }
                        }

                    }
                    if (respuestasAcertadas === respuestasCorrectas) {
                        $scope.estadoUnidad = 'acierto';
                    } else {
                        $scope.estadoUnidad = 'fallo';
                    }
                };

                $scope.irASiguienteUnidad = function () {
                    $scope.siguienteUnidad = parseInt($routeParams.unidad) + 1;
                    if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                        var avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                        var lids = JSON.parse(localStorage.getItem('lids' + $routeParams.modulo));
                        var indice = 0;

                        /*Busca el indice basado en el id de la lección para actualizar e avance*/
                        for (var i in lids) {
                            if (lids[i] == $routeParams.leccion) {
                                indice = i;
                            }
                        }
                        avanceUsuario.lecciones[indice - 1] = 1;

                        /* Mira cuantas lecciones se han terminaddo para dar un resultado final */
                        var contador = 0;
                        for (var i in avanceUsuario.lecciones) {
                            if (avanceUsuario.lecciones[i] == 1) {
                                contador++;
                            }
                        }
                        avanceUsuario.leccionesTerminadas = contador;
                        localStorage.setItem("avanceUsuario", JSON.stringify(avanceUsuario));
                        $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $routeParams.unidad + "/leccion-terminada");
                    } else {
                        $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $scope.siguienteUnidad);
                    }
                };

                $scope.reiniciarUnidad = function () {
                    for (var i in $scope.unidad.opciones) {
                        $scope.unidad.opciones[i].estilo = '';
                        $scope.unidad.opciones[i].selected = false;
                        $scope.unidad.opciones[i].evaluacion = false;
                        $scope.unidad.opciones[i].sticker = 'remove mal';
                        respuestasSeleccionadas = 0;
                    }
                    $scope.estadoUnidad = 'espera';
                    $scope.botonCalificar.estilo = 'no-activo';
                    $scope.botonCalificar.disabled = 'disabled';
                };
            }])
        .directive('opcionesUnidadInfo', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '=',
                    colspan: '=',
                    index: '@'
                },
                templateUrl: 'views/directives/opcionesUnidadInfo.html',
                link: function ($scope, $element, $attrs) {
                    $scope.click = function () {
                        $scope.$parent.seleccionarOpcion($scope.index);
                    };
                }

            };
        })
        .directive('parejasUnidadInfo', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '=',
                    index: '@'
                },
                templateUrl: 'views/directives/parejasUnidadInfo.html',
                link: function ($scope, $element, $attrs) {
                    $scope.click = function () {
                        $scope.$parent.seleccionarPareja($scope.index);
                    };
                }

            };
        })
        .directive('calificarUnidad', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'views/directives/calificarUnidad.html',
                link: function ($scope, $element, $attrs) {
                    $scope.calificar = function () {
                        $scope.$parent.calificarUnidad();
                    };
                }
            };
        })
        .directive('reiniciarUnidad', function () {
            return {
                restrict: 'E',
                scope: {
                    feedback:'='
                },
                templateUrl: 'views/directives/reiniciarUnidad.html',
                link: function ($scope, $element, $attrs) {
                    $scope.reiniciar = function () {
                        $scope.$parent.reiniciarUnidad();
                    };
                }
            };
        })
        .directive('siguienteUnidad', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'views/directives/siguienteUnidad.html',
                link: function ($scope, $element, $attrs) {
                    $scope.siguienteUnidad = function () {
                        $scope.$parent.irASiguienteUnidad();
                    };
                }
            };
        })

        ;