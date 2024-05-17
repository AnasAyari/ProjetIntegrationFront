<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use App\Repository\CommandRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;



#[ORM\Entity(repositoryClass: CommandRepository::class)]
class Command
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['command'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['command'])]
    private ?string $location = null;

    #[ORM\ManyToOne(inversedBy: 'commands')]
    #[Groups(['command'])]
    private ?User $user ;

    #[ORM\ManyToMany(targetEntity: Poster::class)]
    #[Groups(['command'])]
    private Collection $posters;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    
    public function getUser(): User
{
    return $this->user;
}

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
    public function __construct()
{
    $this->posters = new ArrayCollection();
}

public function getPosters(): Collection
{
    return $this->posters;
}

public function addPoster(Poster $poster): self
{
    if (!$this->posters->contains($poster)) {
        $this->posters[] = $poster;
    }

    return $this;
}

public function removePoster(Poster $poster): self
{
    $this->posters->removeElement($poster);

    return $this;
}
     
 
}