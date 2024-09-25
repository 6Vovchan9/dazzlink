import { AfterViewInit, Component, signal } from '@angular/core';
import { AbsractExample } from '@app/shared/helpers/classes/abstract.class';
import { ourTeamList } from '@app/shared/constants/ourTeam.constants';
import { IAboutPersonalData } from '@app/shared/interfaces';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent extends AbsractExample implements AfterViewInit {

  public ourPersonal: Array<IAboutPersonalData> = ourTeamList;
  public showNavModal = false;
  public chosenPersonData: IAboutPersonalData;

  public mainPicBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAJcklEQVR4AQCBAH7/AF1oo/9ibKf/anOt/3R8tP9/hbv/iY7B/5KTxP+YlsP/nJbA/5+Vu/+hk7X/pJGw/6iQq/+vkaj/uJSo/8KYqf/Onav/2qKt/+anr//wq7H/+a6x//+vsP//rq7//6uq//+mpf//oJ7//5mW//+Qjf/9iIX/+IF9//R8eP/yeXX/AIEAfv8AWGqj/1xupv9kdaz/b360/3qIu/+EkMD/jZbD/5OZw/+XmcD/mpi7/5yWtf+flLD/pJOs/6uUqf+0l6j/vpyp/8qhq//Wpq7/4auw/+yvsv/1srP//bOy//+ysP//sKz//6un//+loP//npj//5aQ//uOiP/2h4H/8oJ7//F/ef8AgQB+/wBOb6L/UnKl/1p6q/9lg7P/cIy6/3uUwP+DmsP/ip7D/46fwP+Rnbz/lJy2/5easf+cmq3/o5ur/6yeqv+3oqv/wqit/86tsP/asrL/5ba0/++5tf/3u7X//Luz//+5sP//tav//6+l//+pnv/8oZb/95qO//OTh//wjoL/7ouA/wCBAH7/AEF1of9GeaX/ToCr/1iJs/9kk7r/bpvA/3eiw/9+pcT/g6bC/4amvf+JpLj/jaOz/5Kjr/+Zpa3/o6it/62srv+5sbD/xbez/9G8tv/cwbj/5sS5/+7Guv/1xrn/+cW2//zCsv/8va3/+rem//ewn//zqZj/76OR/+yejP/rnIr/AIEAfv8ANX2j/zmBpv9Biaz/TJK0/1ecu/9ipML/a6vF/3Kvxv94sMT/e7DA/3+vvP+Drrf/iK+0/5Cwsv+Zs7L/pLiz/6+9tf+7w7j/x8i7/9PNvf/d0b//5tPA/+3Uv//y1L7/9dG7//bOtv/1yLD/88Kq//C8o//stp3/6bGY/+ivlv8AgQB+/wAqh6b/L4up/zeTsP9BnLf/Taa//1iuxf9htcn/abnK/267yf9yvMX/drvB/3u7vf+Au7r/iL24/5HAuP+bxbn/p8q7/7PQvv+/1cH/ytrE/9Xexv/e4cf/5uPI/+zjx//w4sT/8t/B//LavP/w1bb/7c+w/+rJqv/nxab/5sOj/wCBAH7/ACSSrP8olq//MJ21/zumvf9GsMT/UbnL/1vAz/9ixND/aMbP/23HzP9xx8j/dcfF/3vIwv+DysD/jM3A/5bRwf+h18P/rdzG/7nhyf/F5sz/z+vO/9nu0P/h8NH/6PHQ/+zwz//v7sz/7+rI/+7lwv/s4L3/6du3/+fXs//l1bH/AIEAfv8AI5yz/yegt/8vp73/ObDE/0S5zP9PwtL/WcnW/2DO2P9m0Nf/a9HU/2/R0f900c3/etLK/4LUyf+K2Mn/ldzK/6DhzP+r5s7/t+vR/8Lw1P/N9Nb/1/jY/9/72v/m/Nr/6/zZ/+/61v/w99P/7/PO/+3uyf/q6cT/6OXA/+fjvv8AgQB+/wAmo7z/K6fA/zKuxf88tsz/R8DU/1LI2v9bz97/Y9Tg/2nX3/9u2N3/ctjZ/3fZ1v992tP/hdzS/43f0f+X4tL/oufU/63s1v+48dj/w/bb/8763f/X/uD/4P/h/+f/4v/t/+H/8P/f//L+3P/x+tj/8PXT/+3xzv/r7cr/6uvI/wCBAH7/AC+nxf8zqsj/OrHO/0S51P9Owtv/Wcrh/2LR5f9q1uf/cNnm/3Xa5P952uH/ftve/4Tc2/+L3tn/k+DZ/53k2f+n6Nr/se3c/7zx3v/H9eH/0frj/9v95f/k/+f/6//o//H/5//0/+X/9v/i//X73v/09tn/8fLU/+/u0f/u7M//AIEAfv8AOqXM/z6oz/9Fr9T/Trfb/1m/4f9jx+f/a87r/3PS7P951ez/ftbp/4LX5v+H1+P/jdjh/5Ta3/+c3N7/pd/e/67j3/+45+D/wuvi/83v5P/X8+b/4Pfo/+n56f/w++r/9vzq//n76P/6+OX/+vTh//jv3P/26tf/9OfT//Ll0f8AgQB+/wBHntH/S6HU/1Kn2P9brt//ZLbl/26+6v92xO3/fcnv/4PL7v+IzOz/jc3p/5LN5v+XzuP/ntDh/6XS4P+u1eD/t9jg/8Dc4f/K3+L/1OPk/93m5f/m6ef/7+zo//bu6f/77un//u3n///q4///5t///eHa//rc1f/42NH/9tbP/wCBAH7/AFSR0v9YlNX/XprZ/2eh3/9wqeX/ebDq/4G17f+Iuu7/jrzt/5K96/+Xvuj/nL7l/6G/4v+oweD/r8Pf/7fF3v+/yN7/yMve/9HO3//b0eD/5NTi/+zX4//02eT/+9vl///b5P//2eL//9be///S2f//zNT//sfP//vDy//6wcj/AIEAfv8AYIHR/2OE0/9pidf/cZDd/3qX4v+Dnub/i6Pp/5Gn6v+Xqen/m6vn/6Cr5P+lrOH/qqze/7Cu3P+3sNv/v7La/8e02f/Qt9n/2Lra/+G82//qv9z/8sLd//rE3f//xd7//8Td///D2v//v9b//7rR//+1y///r8b//qvC//ypv/8AgQB+/wBqb83/bXLP/3N30/96fdj/g4Td/4uK4f+SkOT/mZPk/56V4/+il+H/p5fe/6yY2/+xmNj/t5rW/76b1f/GndT/zaDT/9ai0//epNP/5qfT/+6p1P/2q9X//q3V//+u1f//rdT//6vR//+nzf//osf//5zB//+XvP//krf//ZC1/wCBAH7/AHFeyP90Ycv/eWbO/4Fs0/+Jctj/kXjb/5h93v+egd7/o4Pd/6iE2/+shdj/sYXV/7aG0v+8h9D/w4nP/8qLzf/Sjc3/2o/M/+KRzP/qk8z/8pXN//qXzf//mc3//5nN//+Yy///lsj//5LE//+Mvv//hrj//4Cy//98rf/+eav/AIEAfv8AdVHE/3hUxv9+Wcr/hV7P/41l0/+Ua9b/m2/Y/6Fz2f+mddj/q3bV/6930/+0d9D/uXjN/8B5y//Ge8n/zX3I/9V/x//dgcf/5IPG/+yFxv/0h8f//IjH//+Kx///isf//4nF//+Gwv//gr3//3y3//92sP//cKr//2ul//5oo/8BgQB+/wB4SsL/e03E/4BRyP+HV8z/j13Q/5Zj1P+daNb/o2vW/6ht1f+sbtL/sW/Q/7Zwzf+7cMr/wXLI/8hzxv/PdcX/1nfE/955xP/me8P/7X3D//V/w//8gMT//4HE//+Cw///gMH//36+//95uf//c7P//22s//9npv//YqH//l+e/4JnIdmdFalkAAAAAElFTkSuQmCC";
  public miniMainPicBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQxklEQVR4AQCBAH7/AHWfx/92n8f/d5/H/3eex/93ncX/dprD/3SWv/9ykrv/cI62/3CLs/9yibH/doqx/3yMs/+Fkbb/jpa6/5ibvv+ioMH/q6TD/7Oow/+6q8T/wq3E/8mwxP/Rs8T/2LbE/964xP/iucL/5bi//+a2u//ls7f/47Cy/+Gsrv/gq6z/AIEAfv8AeKPK/3mjyv96o8v/eqPK/3qiyf95n8f/d5vD/3WXvv9zkrr/c4+2/3WNtP95jrT/f5C2/4eUuf+Qmbz/mp7A/6Ojwv+rp8T/s6rF/7utxf/Cr8X/yrLF/9G1xf/YuMX/3rrE/+O7w//lusD/5ri8/+W1uP/ksrP/4q+v/+Gtrf8AgQB+/wB+q9D/fqvQ/3+s0f+Aq9H/gKrP/3+nzf99pMn/e5/F/3mbwP94l73/epW6/32Vuv+Dl7v/i5u9/5OfwP+cpMP/pajF/62rxv+0rsb/u7DG/8Kyxv/Ktcb/0bjG/9i7xv/evcb/477E/+a+wv/nvL7/5rm6/+W2tf/js7L/4rKv/wCBAH7/AIS11/+Etdj/hbbY/4a22P+Gtdf/hrLV/4Sv0f+Cqs3/gKbI/3+ixP+AoML/g5/A/4ihwf+Po8P/l6fF/5+rx/+nrsj/rrHJ/7WzyP+7tMj/wrbH/8m5x//QvMf/17/H/97Bx//jw8b/5sPE/+fBwP/nv7z/5ry4/+S5tP/juLP/AIEAfv8Aib/e/4nA3v+LwN//jMDf/4zA3/+Mvt3/irrZ/4i21f+GsdD/ha3M/4aryf+Iqsf/jarH/5OtyP+ar8r/obLL/6i1y/+utsv/tLjK/7q5yf/Bu8f/yL3H/8/Ax//Ww8f/3cXH/+LHx//myMX/58fC/+fFvv/nwrv/5cC3/+W/tv8AgQB+/wCLyOL/jMjj/47J5P+PyuT/kMnk/5DI4/+PxeD/jcHc/4u81/+KuNP/irXP/4y0zf+QtM3/lbXN/5y3zf+iuc7/qLvN/668zP+zvcr/ub7J/76/x//Fwcb/zMTG/9PHx//aysf/4MzH/+TNxv/mzcP/58vA/+fJvf/mx7r/5ca4/wCBAH7/AIvN4/+MzuT/jtDl/5DR5/+S0ef/ktDm/5HN5P+QyuD/jsbc/43C2P+Nv9T/j73S/5K90P+XvdD/nL/Q/6LAz/+nwc7/rMHM/7HByv+2wsj/u8LG/8HExf/Jx8X/0MvG/9fOx//d0cf/4tLG/+XSxP/m0cL/5tC//+XOvP/lzbv/AIEAfv8AiNDh/4nR4v+L0+T/jtXm/5DW5/+R1ef/kdTl/5DR4v+Pzd7/jsna/47G1/+QxNT/k8TT/5fE0v+cxdH/oMbQ/6XGz/+pxsz/rsXJ/7LFx/+3xsX/vsjE/8XLxP/NzsX/1NLG/9vVx//g2Mb/49jF/+XYw//l1sD/5dW+/+TUvf8AgQB+/wCB0N3/g9Le/4bU4P+J1uP/jNjl/47Y5f+P1+T/j9Xi/47S3/+Nz9v/jszY/4/L1v+SytT/lsrT/5rL0v+fy9H/o8vP/6fKzP+rysn/r8nG/7TKxP+6zMP/wc/D/8nTxP/R18b/2NrH/97dx//i3sb/5N7F/+Tdwv/k3MD/5Ny//wCBAH7/AHrP1v980Nj/f9Pb/4PW3v+H2OH/itri/4va4v+M2OH/jNbe/4zT2/+N0dn/jtDW/5HP1f+Vz9T/mdDT/57Q0f+i0M//pc/M/6nOyf+tzsb/ss7D/7jQwv+/08P/x9fE/8/cxv/X4Mj/3ePI/+HlyP/j5cf/5OXF/+Xkw//l48L/AIEAfv8AcszQ/3TN0v940dX/fdTZ/4HY3P+F2t//h9vf/4na3/+K2d3/itfb/4vV2f+O1Nf/kdTW/5XV1f+Z1dT/ndXS/6HV0P+l1M3/qNPK/6zTx/+x08T/t9XD/77ZxP/G3cX/z+LH/9bmyf/d6cr/4evK/+Tsyf/l7Mj/5uvG/+brxf8AgQB+/wBsycr/bsvM/3LOz/9309T/fNfY/4Ha2/+E293/htzd/4jb3P+J2tv/i9nZ/47Y2P+R2df/ldnW/5ra1v+e2tT/otrS/6XZz/+p2cz/rdjI/7HZxv+328X/v97G/8fix//P58r/1+zM/97vzf/i8s3/5fPM/+fyy//n8sr/5/LJ/wCBAH7/AGfGxf9pyMf/bszL/3PR0P951dX/ftnY/4Lc2/+F3dz/h93b/4nc2v+L29n/jtzZ/5Lc2P+W3dj/m97Y/6Df1v+j39T/p97R/6rdzv+u3cv/s97J/7ngyP/A48j/yOfK/9HszP/Y8c7/3/TP/+T30P/n+M//6PjO/+n3zf/p98z/AIEAfv8AZMPB/2bGw/9rysj/cc/N/3fU0v992Nb/gdvZ/4Td2/+H3dv/id3a/4zd2v+P3dn/k97Z/5jg2f+d4dn/oeLY/6Xi1v+p4tP/rOHQ/7Dhzf+14cv/uuPK/8Lmyv/K68z/0u/O/9n00P/g+NH/5frR/+j70f/p+8//6vvO/+r6zf8AgQB+/wBjwb//ZsPB/2rIxv9wzcv/d9LQ/3zX1f+B2tj/hdza/4fc2v+K3Nr/jN3Z/5Dd2f+U39n/meDa/57i2v+j49n/p+PX/6rj1P+u4tH/seLO/7bizP+85Mv/wufL/8rrzP/S8M7/2vXQ/+D40f/k+tH/5/vR/+n7z//p+87/6vvN/wCBAH7/AGS/vv9nwcD/a8XF/3HLyv940M//fdXU/4LY1/+F2dn/iNrZ/4ra2f+N2tj/kNvY/5Xc2P+Z3tn/n+DZ/6Ph2P+o4tf/q+HU/6/h0f+y4c7/tuHL/7zjyv/C5sr/yunL/9Luzf/Z8s7/3/XP/+P3z//m+M//5/jN/+j4zP/o+Mv/AIEAfv8AZ7y+/2m/wP9uw8X/dMjK/3rNz/9/0dP/g9TW/4bW1/+J1tf/i9bX/43W1v+Q19b/ldjW/5ra1/+f3Nf/pN3X/6je1f+r3dP/r93P/7LdzP+23cr/u97I/8LhyP/J5cn/0OnK/9fty//d8Mz/4fLM/+Pzy//l88r/5fLI/+Xyx/8AgQB+/wBsusD/brzC/3LAxv94xcv/fsrQ/4PO0/+G0Nb/idHX/4rR1v+M0NX/jtDU/5HQ1P+V0tT/mtPU/5/V1f+k19T/qNjT/6zY0P+v183/stfK/7bXx/+72Mb/wdvF/8jexv/P4sf/1ebI/9vpyP/f6sj/4evH/+Lrxv/j6sT/4+rD/wCBAH7/AHO4w/91usX/eb7J/37Czf+DxtL/iMrV/4vL1v+MzNf/jsvW/4/K1P+QytP/k8rS/5bL0v+bzNL/oM7T/6XQ0v+p0dH/rdHO/7DQy/+z0Mj/t9DF/7vRw//B1MP/yNfD/8/bxP/V3sX/2uHF/97jxf/g48T/4ePC/+Liwf/i4sD/AIEAfv8AfLfI/365yv+CvM3/h8DR/4vE1f+Px9j/kcjZ/5LH2P+Txtf/k8XV/5TD0/+Ww9L/msTR/57G0v+jyNL/qMnR/6zK0P+wys7/s8rL/7bKyP+6ysX/vsvD/8TNwv/K0ML/0dTD/9fXxP/c2sT/4NvD/+Lcwv/j3MH/49u//+Pbvv8AgQB+/wCIts//irjQ/4271P+Rv9f/lcLa/5jE3P+axd3/msTc/5rC2v+awNf/m77V/5y+0/+gv9P/pMDT/6nC0/+uxNP/ssXS/7XF0P+5xc3/vMXJ/7/Fx//ExsX/ycjE/8/LxP/WzsT/3NLF/+HUxf/k1sX/59fE/+jWwv/o1sH/6NXA/wCBAH7/AJW31/+XuNj/mrvb/56/3/+hweH/pMPj/6XD4/+lweH/pL/e/6O92/+ju9n/pbrX/6i71/+svNf/sb7X/7bA1/+6wdb/vsLU/8HC0f/Ewc7/yMHL/8zCyf/RxMj/18fI/97LyP/jzsn/6NHJ/+zTyf/u08j/8NPG//DTxf/w0sT/AIEAfv8Ao7ff/6S44f+nu+P/q77m/67A6f+wwur/scHp/7C/5/+vveT/rrrh/6643v+vt93/srjc/7a63P+7vNz/wL7c/8W/2//IwNn/y7/X/86/0//Sv9H/1sDO/9vCzf/hxc3/58nO/+3Mzv/yz8//9tDO//jRzf/60cz/+tHL//rQyv8AgQB+/wCvteb/sbfo/7S66v+3vO3/ur/v/7u/8P+8v+//u73t/7q66v+4t+b/uLXk/7q04v+9teH/wbfi/8a54v/Lu+L/z73i/9O94P/Wvd3/2b3a/9y91//gvtT/5cDT/+vD0//xxtT/98rU//zM1f//ztT//8/T///P0v//z9H//87Q/wCBAH7/ALmx6v+6s+z/vbXu/8C48f/DuvP/xbv0/8W68//EuPH/w7Xu/8Gz6v/Bsej/w7Dm/8ax5v/Ks+b/z7bn/9S45//Zueb/3brl/+C64v/iut7/5rrb/+m62f/uvNj/9L/X//rC2P//xtj//8jZ///K2P//y9j//8vW///L1f//y9T/AIEAfv8Avqrr/7+r7P/Cru//xbDx/8iy9P/Ks/T/yrP0/8mx8f/Iru7/x6zr/8eq6f/Jquj/zKvn/9Gt6P/WsOn/27Lp/+C06f/jtOf/5rTk/+m04P/ss93/77Ta//S22f/5uNj//7vZ//+/2f//wdn//8PZ///E2P//xNf//8TW///E1f8AgQB+/wC+nub/wJ/o/8Oi6//Gpe3/yafw/8uo8f/LqPD/y6bu/8qk6//Joen/yaDm/8ug5f/PoeX/06Tm/9mn5//eqej/4qvn/+as5f/pq+L/66ve/+2q2//xqtj/9azW//qu1f//sdX//7TW//+21v//uNb//7nV//+61P//udP//7nS/wCBAH7/ALqP3v+8kOD/v5Pi/8KW5v/Fmej/x5rp/8ia6f/ImOf/x5bl/8eU4v/Hk+D/yZTg/82V4P/SmOH/15vi/92e4//hn+L/5KDg/+ef3f/pntn/657V/+6d0v/yntD/96DP//yjzv//ps7//6jO//+qzv//q83//6vM//+ry///q8r/AIEAfv8As37T/7SA1f+3g9j/u4bb/76J3v/Bit//wovf/8KJ3v/BiNz/wYba/8KF2P/Ehtj/yIjY/82L2v/Tjtv/2JHb/92S2//gk9j/4pLV/+SR0f/lj8z/6I/J/+uQxv/wkcX/9ZTE//qWxP/+mcT//5rE//+bw///m8L//5vA//+bwP8AgQB+/wCqb8j/rHHK/69zzf+zd9D/tnrT/7l81f+6fNX/unvU/7p60v+6edD/vHjP/755z//Ce9D/yH7R/82B0v/ShNP/14XS/9qG0P/bhcz/3YPH/96Cw//ggb//5IG8/+iDu//shbr/8Ye5//aJuf/5i7n/+4y4//2Mtv/9jLX//Yy1/wCBAH7/AKNjv/+lZMH/qGfE/6xrx/+vbsr/snDM/7Rxzf+0cMz/tG/K/7Ruyf+2bsj/uW/I/71xyf/CdMr/yHfL/816zP/Re8v/1HvI/9Z6xf/XeMD/2He7/9p2t//ddrT/4Xey/+V5sf/qe7D/7n2w//F/r//0gK7/9YCt//WArP/2f6v/AYEAfv8Anly6/6BevP+kYb//qGTC/6tnxf+uasf/sGrI/7Bqx/+wacb/sWjE/7Jow/+1acP/umvE/79uxv/Fcsf/ynTI/852x//QdsT/0nTA/9Nzu//Ucbf/1nCy/9lwr//dca3/4XOs/+V1q//qd6v/7Xiq/+95qf/weaj/8Xmn//F5pv/q1xCeEzY3RgAAAABJRU5ErkJggg==';
  public mainPicLoad = signal<boolean>(false);
  public paddingForScrollbar: string;

  constructor(
    public mobileDetectService: MobileDetectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    if (mobileDetectService.osDevice?.toLowerCase() === 'ios') {
      this.paddingForScrollbar = '9px';
    }
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams.name) {
      this.findPersonFromQueryParam(this.route.snapshot.queryParams.name);
    }
  }

  ngAfterViewInit(): void {
    // console.log(this.getName());
    this.scrollToTop();
  }

  public setMainPicLoad(): void {
    // setTimeout(() => {
      this.mainPicLoad.set(true);
    // }, 2000);
  }

  public helloLoad(): void {
    console.log('helloLoad');
  }

  requiredMethod(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  getName(): string {
    let greeting = super.getName() + ' hello!';
    return greeting;
  }

  private scrollToTop(): void {
    document.getElementById('pageWrap').scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  private findPersonFromQueryParam(name: string) {
    const person = this.ourPersonal.find(el => el.queryParamName?.toLowerCase() === name.toLowerCase());
    if (person) {
      this.openPersonDescModal(person);
    }
  }

  public openPersonDescModal(persona: IAboutPersonalData): void {
    if (persona.details?.vita) {
      if (persona.queryParamName) {
        this.setNameQueryParam(persona.queryParamName);
      }
      this.chosenPersonData = persona;
      this.hideScroll();
    }
  }

  public closePersonDescModal(): void {
    this.setNameQueryParam(null);
    this.chosenPersonData = null;
    this.showScroll();
  }

  private setNameQueryParam(name: string) {
    this.router.navigate(
      [],
      {
        queryParams: { name },
        replaceUrl: true,
        queryParamsHandling: 'merge'
      }
    );
  }
}
